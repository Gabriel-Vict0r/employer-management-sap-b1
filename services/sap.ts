import { Branch } from "@/interfaces/branches"
import { sapRequest } from "@/lib/sap-client"

const SAP_PAGE_SIZE = 100

function extractNextEndpoint(nextLink: string): string {
  const marker = "/b1s/v2/"
  const idx = nextLink.indexOf(marker)
  if (idx >= 0) return nextLink.slice(idx + marker.length)
  return nextLink.replace(/^\//, "")
}

async function getAllPages<T>(url: string): Promise<T[]> {
  const result: T[] = []
  let endpoint: string | null = url

  while (endpoint) {
    const data = await sapRequest(endpoint, {
      headers: { Prefer: `odata.maxpagesize=${SAP_PAGE_SIZE}` },
    })
    const items: T[] = Array.isArray(data?.value) ? data.value : []

    result.push(...items)

    const rawNextLink: string | undefined = data?.["@odata.nextLink"]
    endpoint = rawNextLink ? extractNextEndpoint(rawNextLink) : null
  }
  return result
}

export async function getDepartments() {
  return getAllPages("Departments")
}

export async function getBranches() {
  return getAllPages<Branch>("BusinessPlaces")
}

export async function getEmployees() {
  return getAllPages("EmployeesInfo")
}

export async function getCostCenters() {
  return getAllPages("ProfitCenters")
}
export async function getUsers() {
  return getAllPages("Users")
}
export async function insertEmployee(employee: {
  firstName: string
  middleName?: string
  lastName: string
  department: number
  branches: number[]
  costCenter: number
  seniorID: number
  userCode: number
  manager: number
  remark?: string
  sexEx: string
}) {
  const payload = {
    FirstName: employee.firstName,
    MiddleName: employee.middleName,
    LastName: employee.lastName,
    Department: employee.department,
    CostCenterCode: employee.costCenter,
    ExternalEmployeeNumber: employee.seniorID,
    ApplicationUserID: employee.userCode === 0 ? null : employee.userCode,
    EmployeeBranchAssignment: [{ BPLID: employee.branches[0] }],
    Manager: employee.manager,
    Remarks: employee.remark,
    GenderEx: employee.sexEx,
    Gender: employee.sexEx === "M" ? "gt_Male" : "gt_Female",
  }

  console.log("Payload for SAP:", JSON.stringify(payload, null, 2))
  return sapRequest("EmployeesInfo", {
    method: "POST",
    body: payload,
  })
}
