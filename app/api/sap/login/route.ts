import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export async function POST() {
  const response = await fetch(`${process.env.SAP_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CompanyDB: process.env.SAP_COMPANYDB,
      Password: process.env.SAP_PASSWORD,
      UserName: process.env.SAP_USERNAME,
    }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: "Falha na autenticação do SAP" },
      { status: 500 }
    )
  }

  const data = await response.json()

  return NextResponse.json(data, {
    headers: {
      "Set-Cookie": `B1SESSION=${data.SessionId}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  })
}
