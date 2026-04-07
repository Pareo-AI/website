import { NextResponse } from 'next/server'

// TODO (Phase 2): persist events to analytics backend (Supabase or Google Sheets).
// Schema: { email, founder, timestamp, event_type: 'email_submitted' }
export async function POST(req: Request) {
  const body = await req.json()
  console.log('[card-lead]', body)
  return NextResponse.json({ ok: true })
}
