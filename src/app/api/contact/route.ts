import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Disable Next.js default body parsing for this route
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log environment variables (without showing the password)
    console.log('SMTP Configuration:');
    console.log('Host:', process.env.SMTP_HOST);
    console.log('Port:', process.env.SMTP_PORT);
    console.log('User:', process.env.SMTP_USER);
    console.log('From:', process.env.SMTP_FROM);
    console.log('Password set:', !!process.env.SMTP_PASS);

    // Create transporter with correct Zoho configuration
    // Zoho supports both port 465 (SSL) and 587 (TLS)
    const port = parseInt(process.env.SMTP_PORT || '587');
    const isSecurePort = port === 465;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com.au',
      port: port,
      secure: isSecurePort, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        // Minimum TLS version
        minVersion: 'TLSv1.2',
        // For port 587
        ciphers: 'SSLv3'
      },
      // Connection timeout
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      // Remove debug in production
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    });

    // Test the connection first
    console.log('Testing SMTP connection...');
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError: any) {
      console.error('SMTP verification failed:', verifyError);
      
      // Check for common Zoho issues
      if (verifyError.message?.includes('Invalid login')) {
        return NextResponse.json(
          { 
            message: 'Email authentication failed. Please check if app-specific password is configured in Zoho.',
            hint: 'You may need to generate an app-specific password in Zoho Mail settings'
          },
          { status: 500 }
        );
      }
      
      throw verifyError;
    }

    // Prepare email content with better formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; }
            .message { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value message">${message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    console.log('Sending email...');
    const info = await transporter.sendMail({
      from: `"Carbie Contact Form" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_FROM,
      subject: `Contact Form: ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: htmlContent,
      replyTo: email,
    });

    console.log('Email sent successfully:', info.messageId);
    
    return NextResponse.json({ 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
    
  } catch (error: any) {
    console.error('Detailed error sending email:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    console.error('Error responseCode:', error.responseCode);

    // Return more specific error information
    let errorMessage = 'Failed to send email';
    let hint = '';
    
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      errorMessage = 'Authentication failed';
      hint = 'Check if you need an app-specific password for Zoho';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed';
      hint = 'Check SMTP settings and firewall';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection timed out';
      hint = 'Check network connectivity and firewall settings';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Socket error';
      hint = 'Possible TLS/SSL configuration issue';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        message: errorMessage,
        hint: hint,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: error.code 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}