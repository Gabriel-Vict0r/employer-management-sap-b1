import { Branch } from "@/interfaces/branches"
import React from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */

const STORAGE_KEY = "branches_cache"

// cache em memória (evita parse toda hora)
let branchesCache: { Code: number; Name: string }[] | null = null

export function useBranches() {
  const [branches, setBranches] = React.useState<
    { Code: number; Name: string }[]
  >([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchBranches() {
      console.log("branchesCache:", branchesCache)
      try {
        // 1. tenta memória
        if (branchesCache) {
          setBranches(branchesCache)
          setLoading(false)
          return
        }

        // 2. tenta localStorage
        const stored = localStorage.getItem(STORAGE_KEY)
        //console.log("stored:", stored)
        if (stored) {
          const parsed = JSON.parse(stored)

          branchesCache = parsed
          setBranches(parsed)
          setLoading(false)
          return
        }

        // 3. chama API
        const res = await fetch("/api/sap/branches")
        const data = await res.json()
        console.log(data)
        const formatted = data.map((branch: any) => ({
          Code: branch.BPLID,
          Name: branch.BPLName,
        }))

        // salva nos dois
        branchesCache = formatted
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted))

        setBranches(formatted)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchBranches()
  }, [])

  return { branches, loading }
}
