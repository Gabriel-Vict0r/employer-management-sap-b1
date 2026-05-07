import React from "react"
/* eslint-disable @typescript-eslint/no-explicit-any */

const STORAGE_KEY = "users_cache"

let usersCache: { Code: number; Name: string }[] | null = null

export function useUsers() {
  const [users, setusers] = React.useState<{ Code: number; Name: string }[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchusers() {
      try {
        if (usersCache) {
          setusers(usersCache)
          setLoading(false)
          return
        }

        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          usersCache = parsed
          setusers(parsed)
          setLoading(false)
          return
        }

        const res = await fetch("/api/sap/users")
        const data = await res.json()
        //console.log("Fetched users:", data)
        const formatted = data.map((usr: any) => ({
          Code: usr.InternalKey,
          Name: usr.UserCode,
        }))
        //  salva nos dois
        usersCache = formatted
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted))

        setusers(formatted)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchusers()
  }, [])
  return { users, loading }
}
