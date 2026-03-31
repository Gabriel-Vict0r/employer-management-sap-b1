type SapSession = {
  cookie: string
  expiresAt: number
}

let session: SapSession | null = null

export function getSession() {
  if (!session) return null

  const isExpired = Date.now() > session.expiresAt
  if (isExpired) {
    session = null
    return null
  }
  return session
}

export function setSession(cookie: string, ttlMiutes = 25) {
  session = {
    cookie,
    expiresAt: Date.now() + ttlMiutes * 60 * 1000,
  }
}
