import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
// It will gracefully fail if the key is missing during development, allowing us to catch the error
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, project } = body;

    // Validate inputs
    if (!name || !email || !project) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the date for the email
    const submittedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    // Create the clean HTML email template requested by the user
    const htmlTemplate = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="font-weight: 400; margin-bottom: 24px;">New Project Inquiry</h2>
        
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        
        <div style="margin-bottom: 16px;">
          <strong style="display: block; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Name</strong>
          <span style="font-size: 16px;">${name}</span>
        </div>

        <div style="margin-bottom: 16px;">
          <strong style="display: block; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Email</strong>
          <a href="mailto:${email}" style="font-size: 16px; color: #0066cc; text-decoration: none;">${email}</a>
        </div>

        <div style="margin-bottom: 24px;">
          <strong style="display: block; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Submitted</strong>
          <span style="font-size: 16px;">${submittedDate}</span>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        
        <div style="margin-bottom: 24px;">
          <strong style="display: block; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Project</strong>
          <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${project}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      </div>
    `;

    // Send the email
    const data = await resend.emails.send({
      from: 'ZAYVON Studio <onboarding@zayvon.tech>', // Make sure zayvon.tech is verified in Resend dashboard
      to: ['hello@zayvon.tech'],
      subject: 'New Project Inquiry — ZAYVON',
      replyTo: email,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}
