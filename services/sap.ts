/* eslint-disable @typescript-eslint/no-explicit-any */
import { Branch } from "@/interfaces/branches"
import { sapRequest } from "@/lib/sap-client"

export async function getDepartments() {
  const url = "Departments"

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

export async function getBranches() {
  const url = "BusinessPlaces"

  let result: Branch[] = []
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

export async function getEmployees() {
  const url = "EmployeesInfo"

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

export async function getCostCenters() {
  const url = "ProfitCenters"

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
