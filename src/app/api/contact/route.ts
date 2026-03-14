import { NextResponse } from 'next/server'
import { CONTACT_EMAIL } from '@/lib/constants'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

async function sendEmailViaMailgun(data: ContactFormData): Promise<void> {
  const mailgunApiKey = process.env.MAILGUN_API_KEY
  const mailgunDomain = process.env.MAILGUN_DOMAIN
  const mailgunSenderEmail = process.env.MAILGUN_SENDER_EMAIL

  if (!mailgunApiKey || !mailgunDomain || !mailgunSenderEmail) {
    console.warn('Mailgun env vars not configured, skipping email send')
    return
  }

  const companyLine = data.company ? `Company: ${data.company}\n` : ''
  const emailBody = `
New contact form submission from ${data.name}

Email: ${data.email}
${companyLine}
Message:
${data.message}

---
Submitted at: ${new Date().toISOString()}
`.trim()

  const formData = new URLSearchParams({
    from: `Pareo Website <${mailgunSenderEmail}>`,
    to: CONTACT_EMAIL,
    subject: `Contact Form: ${data.name}`,
    text: emailBody
  })

  const response = await fetch(
    `https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${mailgunApiKey}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Mailgun API error: ${errorText}`)
  }
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      timestamp: new Date().toISOString()
    })

    await sendEmailViaMailgun(data)

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
