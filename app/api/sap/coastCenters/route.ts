import { getCostCenters } from "@/services/sap"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const costCenters = await getCostCenters()
    return NextResponse.json(costCenters)
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao tentar buscar centros de custo" },
      { status: 500 }
    )
  }
}
