import { getEmployees } from "@/services/sap"
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
