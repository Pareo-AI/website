export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY not set — skipping Turnstile verification')
    return true
  }
  if (!token) return false

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    })
    const data = await res.json()
    return data.success === true
  } catch (err) {
    // Fail open if Turnstile's own API is unreachable, so a CF outage
    // doesn't break legitimate form submissions.
    console.error('Turnstile siteverify request failed:', err)
    return true
  }
}
