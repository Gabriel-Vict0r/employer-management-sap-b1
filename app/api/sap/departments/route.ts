import { getDepartments } from "@/services/sap"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const departments = await getDepartments()
    return NextResponse.json(departments)
  } catch (error) {
    console.error("Erro ao obter departamentos do SAP:", error)
    return NextResponse.json(
      { error: "Erro ao obter departamentos do SAP" },
      { status: 500 }
    )
  }
}
