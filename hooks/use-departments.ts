import React from "react"
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useDepartments() {
  const [departments, setDepartments] = React.useState<
    { id: number; name: string }[]
  >([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch("/api/sap/departments")
        const data = await res.json()

        setDepartments(
          data.map((dep: any) => ({
            id: dep.Code,
            name: dep.Name,
          }))
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  return { departments, loading }
}
