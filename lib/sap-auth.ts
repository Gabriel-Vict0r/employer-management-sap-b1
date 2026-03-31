import { setSession } from "./sap-session"
import path from "path"
import fs from "fs"
import https from "https"
import fetch from "node-fetch"

const certPath = path.resolve(process.cwd(), "certs/SAP-servico.crt")

const agent = new https.Agent({
  ca: fs.readFileSync(certPath),
})

export async function loginSAP() {
  const response = await fetch(`${process.env.SAP_URL}/b1s/v2/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CompanyDB: process.env.SAP_COMPANYDB,
      Password: process.env.SAP_PASSWORD,
      UserName: process.env.SAP_USERNAME,
    }),
    agent: agent,
  })

  if (!response.ok) {
    throw new Error("Falha na autenticação do SAP")
  }
  const cookie = response.headers.get("Set-Cookie")
  if (!cookie) {
    throw new Error("Cookie de sessão não encontrado na resposta do SAP")
  }
  setSession(cookie)
  return cookie
}
