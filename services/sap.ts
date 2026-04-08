import { sapRequest } from "@/lib/sap-client"

export async function getDepartments() {
  const data = await sapRequest("Departments")
  return data.value
}

export async function getBranches() {
  const data = await sapRequest("BusinessPlaces")
  return data.value
}

export async function getEmployees() {
  let url = "EmployeesInfo"

  let result: any[] = []
  let skip = 0
  const top = 100
  let hasMore = true

  while (hasMore) {
    const data = await sapRequest(`${url}?$skip=${skip}&$top=${top}`)
    if (data.value && data.value.length > 0) {
      result = result.concat(data.value)
      skip += top
    } else {
      hasMore = false
    }
  }
  return result
}
