/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession } from "./sap-session"
import { loginSAP } from "./sap-auth"
import fs from "fs"
import path from "path"
import https from "https"
import fetch from "node-fetch"

async function getValidCookie() {
  const session = getSession()
  if (session) {
    return session.cookie
  }
  return await loginSAP()
}

const certPath = path.resolve(process.cwd(), "certs/SAP-servico.crt")

const agent = new https.Agent({
  ca: fs.readFileSync(certPath),
})

type SapRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
  body?: unknown
  headers?: Record<string, string>
}

async function executeRequest(
  endpoint: string,
  cookie: string,
  options: SapRequestOptions
) {
  const { method = "GET", body, headers } = options
  const hasBody =
    (method === "POST" || method === "PUT" || method === "PATCH") &&
    body !== undefined

  //console.log("body:", JSON.stringify(body))
  return fetch(`${process.env.SAP_URL}/b1s/v2/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
      ...headers,
    },
    ...(hasBody ? { body: JSON.stringify(body) } : {}),
    agent,
  })
}

export async function sapRequest(
  endpoint: string,
  options: SapRequestOptions = {}
): Promise<any> {
  let cookie = await getValidCookie()
  let response = await executeRequest(endpoint, cookie, options)

  console.log("na linha 58 do sap-client, response status:", response.status)
  if (response.status === 401) {
    cookie = await loginSAP()
    response = await executeRequest(endpoint, cookie, options)
  }

  interface errorMessageSAP {
    error: {
      code: string
      details: Array<any>
      message: string
    }
  }
  if (response.status === 400) {
    const errMessage: errorMessageSAP = JSON.parse(await response.text())
    console.log("errMessage content = ", errMessage)
    throw new Error("Payload Invalido: " + errMessage.error.message)
  }
  if (!response.ok) {
    throw new Error(
      `Erro ao realizar requisição: ${response.status} ${response.statusText}`
    )
  }

  if (response.status === 204) {
    return null
  }

  const data = await response.json()
  //console.log(data)
  return data
}
