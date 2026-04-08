/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession } from "./sap-session"
import { loginSAP } from "./sap-auth"
import { get } from "node:http"
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

export async function sapRequest(endpoint: string): Promise<any> {
  let cookie = await getValidCookie()
  //console.log("Agente HTTPS configurado com certificado:", certPath)
  let response = await fetch(`${process.env.SAP_URL}/b1s/v2/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    agent: agent,
  })
  if (response.status === 401) {
    cookie = await loginSAP()

    response = await fetch(`${process.env.SAP_URL}/b1s/v2/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      agent: agent,
    })
    if (!response.ok) {
      throw new Error(`Erro ao acessar o SAP: ${response.statusText}`)
    }
  }
  const data = await response.json()
  console.log(data)
  return data
}
