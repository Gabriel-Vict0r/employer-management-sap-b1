import React from "react"
/* eslint-disable @typescript-eslint/no-explicit-any */

const STORAGE_KEY = "employees_cache"

let employeesCache: { Code: number; Name: string }[] | null = null

export function useEmployees() {
  const [employees, setemployees] = React.useState<
    { Code: number; Name: string }[]
  >([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchemployees() {
      try {
        if (employeesCache) {
          setemployees(employeesCache)
          setLoading(false)
          return
        }

        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          employeesCache = parsed
          setemployees(parsed)
          setLoading(false)
          return
        }

        const res = await fetch("/api/sap/employees")
        const data = await res.json()

        const formatted = data.map((emp: any) => ({
          Code: emp.EmployeeID,
          Name: `${emp.FirstName} ${emp.LastName}`,
        }))
        // 🔥 salva nos dois
        employeesCache = formatted
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted))

        setemployees(formatted)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchemployees()
  }, [])
  return { employees, loading }
}
