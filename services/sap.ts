import { sapRequest } from "@/lib/sap-client"

export async function getDepartments() {
  const data = await sapRequest("Departments")
  return data.value
}
