import { NextResponse } from 'next/server';
import { CONTACT_EMAIL } from '@/lib/constants';
import { verifyTurnstile } from '@/lib/turnstile';

interface FitCheckData {
  email: string;
  gdprConsent: boolean;
  score: number;
  turnstileToken: string;
}

async function notifyTeam(data: FitCheckData): Promise<void> {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunSenderEmail = process.env.MAILGUN_SENDER_EMAIL;

  if (!mailgunApiKey || !mailgunDomain || !mailgunSenderEmail) {
    console.warn('Mailgun env vars not configured, skipping email send');
    return;
  }

  const formData = new URLSearchParams({
    from: `Pareo Website <${mailgunSenderEmail}>`,
    to: CONTACT_EMAIL,
    subject: `Fit-check lead: ${data.email} (score ${data.score}/10)`,
    text: `New fit-check submission.\n\nEmail: ${data.email}\nScore: ${data.score} / 10\nGDPR consent: granted ✓\nTimestamp: ${new Date().toISOString()}`,
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

export async function POST(request: Request) {
  try {
    const data: FitCheckData = await request.json();

    if (!data.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!data.gdprConsent) {
      return NextResponse.json({ error: 'GDPR consent is required' }, { status: 400 });
    }

    const humanVerified = await verifyTurnstile(data.turnstileToken);
    if (!humanVerified) {
      return NextResponse.json({ error: 'Bot check failed' }, { status: 400 });
    }

    console.log('Fit-check submission:', {
      email: data.email,
      score: data.score,
      timestamp: new Date().toISOString(),
    });

    await notifyTeam(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing fit-check submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
