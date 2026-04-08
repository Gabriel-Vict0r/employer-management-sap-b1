import { getBranches } from "@/services/sap"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const branches = await getBranches()
    return NextResponse.json(branches)
  } catch (error) {
    console.error("Erro ao obter filiais do SAP:", error)
    return NextResponse.json(
      { error: "Erro ao obter filiais do SAP" },
      { status: 500 }
    )
  }
}
