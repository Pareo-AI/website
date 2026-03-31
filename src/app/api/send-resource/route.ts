import { NextResponse } from 'next/server';
import { CONTACT_EMAIL, SITE_URL } from '@/lib/constants';

interface ResourceRequestData {
  email: string;
  gdprConsent: boolean;
}

async function sendPdfViaMailgun(email: string): Promise<void> {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunSenderEmail = process.env.MAILGUN_SENDER_EMAIL;

  if (!mailgunApiKey || !mailgunDomain || !mailgunSenderEmail) {
    console.warn('Mailgun env vars not configured, skipping email send');
    return;
  }

  const pdfUrl = `${SITE_URL}/pareo-pitch-deck.pdf`;

  const formData = new URLSearchParams({
    from: `Pareo <${mailgunSenderEmail}>`,
    to: email,
    subject: 'Pareo Pitch Deck',
    text: `Hi,

thanks for your interest in Pareo. Here's the pitch deck:

${pdfUrl}

If you'd like to dig into the details or discuss a specific use case, happy to jump on a call.

→ Book a call: https://pareo.ai/#contact

Best,
Bjørn & the Pareo team
Bjoern@pareo.ai · +49 151 73038393`,
  });

  const response = await fetch(`https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${mailgunApiKey}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mailgun API error: ${errorText}`);
  }
}

async function notifyTeam(email: string): Promise<void> {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunSenderEmail = process.env.MAILGUN_SENDER_EMAIL;

  if (!mailgunApiKey || !mailgunDomain || !mailgunSenderEmail) return;

  const formData = new URLSearchParams({
    from: `Pareo Website <${mailgunSenderEmail}>`,
    to: CONTACT_EMAIL,
    subject: `Pitch deck download: ${email}`,
    text: `Someone downloaded the Pareo pitch deck.\n\nEmail: ${email}\nTimestamp: ${new Date().toISOString()}`,
  });

  await fetch(`https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${mailgunApiKey}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });
}

export async function POST(request: Request) {
  try {
    const data: ResourceRequestData = await request.json();

    if (!data.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!data.gdprConsent) {
      return NextResponse.json({ error: 'GDPR consent is required' }, { status: 400 });
    }

    console.log('Pitch deck download request:', {
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    await Promise.all([sendPdfViaMailgun(data.email), notifyTeam(data.email)]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending resource:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
