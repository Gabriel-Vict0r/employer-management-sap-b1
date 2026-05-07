import { getEmployees, insertEmployee } from "@/services/sap"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const employees = await getEmployees()
    return NextResponse.json(employees)
  } catch (error) {
    console.error("Erro ao obter funcionários do SAP:", error)
    return NextResponse.json(
      { error: "Erro ao obter funcionários do SAP" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Received employee data:", body)
    const employee = await insertEmployee(body)
    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}
