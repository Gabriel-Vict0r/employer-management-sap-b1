import React from "react"

const STORAGE_KEY = "CC_cache"

let CCCache: { Code: number; Name: string }[] | null = null
export function useCC() {
  const [CC, setCC] = React.useState<{ Code: number; Name: string }[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchCC() {
      console.log("CCCache:", CCCache)
      try {
        // ✅ 1. tenta memória
        if (CCCache) {
          setCC(CCCache)
          setLoading(false)
          return
        }

        // ✅ 2. tenta localStorage
        const stored = localStorage.getItem(STORAGE_KEY)
        console.log("stored:", stored)
        if (stored) {
          const parsed = JSON.parse(stored)

          CCCache = parsed
          setCC(parsed)
          setLoading(false)
          return
        }

        // 3. chama API
        const res = await fetch("/api/sap/coastCenters")
        const data = await res.json()
        console.log(data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = data.map((costCenter: any) => ({
          Code: costCenter.CenterCode,
          Name: costCenter.CenterName,
        }))

        // 🔥 salva nos dois
        CCCache = formatted
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted))

        setCC(formatted)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCC()
  }, [])

  return { CC, loading }
}
