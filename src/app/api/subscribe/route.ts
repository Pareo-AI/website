import { NextResponse } from 'next/server';
import { CONTACT_EMAIL } from '@/lib/constants';

interface SubscribeData {
  email: string;
  company: string;
  gdprConsent: boolean;
  score: number;
}

async function sendNotificationViaMailgun(data: SubscribeData): Promise<void> {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunSenderEmail = process.env.MAILGUN_SENDER_EMAIL;

  if (!mailgunApiKey || !mailgunDomain || !mailgunSenderEmail) {
    console.warn('Mailgun env vars not configured, skipping email send');
    return;
  }

  const emailBody = `
New match-check lead from the website

Email: ${data.email}
Company: ${data.company}
Checklist score: ${data.score} / 10

GDPR consent: granted ✓

---
Submitted at: ${new Date().toISOString()}
`.trim();

  const formData = new URLSearchParams({
    from: `Pareo Website <${mailgunSenderEmail}>`,
    to: CONTACT_EMAIL,
    subject: `New Lead: ${data.company} (score ${data.score}/10)`,
    text: emailBody,
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
    const data: SubscribeData = await request.json();

    if (!data.email || !data.company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!data.gdprConsent) {
      return NextResponse.json({ error: 'GDPR consent is required' }, { status: 400 });
    }

    console.log('Match-check lead:', {
      email: data.email,
      company: data.company,
      score: data.score,
      timestamp: new Date().toISOString(),
    });

    await sendNotificationViaMailgun(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
