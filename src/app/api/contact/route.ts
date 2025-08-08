import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Use Node.js runtime for this API route
export const runtime = 'nodejs';

/**
 * Handle contact form submissions
 * Receives form data and sends it via email
 */
export async function POST(request: Request) {
  try {
    // Extract form data from the request
    const { name, email, message } = await request.json();

    // Validate that all required fields are provided
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Configure email settings for Zoho SMTP
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
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
        ciphers: 'SSLv3'
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    });

    // Test the email connection before sending
    try {
      await transporter.verify();
    } catch (verifyError: unknown) {
      console.error('Email connection failed:', verifyError);
      
      // Provide helpful error messages for common issues
      if (verifyError instanceof Error) {
        const errorObj = verifyError as { code?: string; message?: string };
        
        if (errorObj.code === 'EAUTH' || errorObj.message?.includes('Invalid login')) {
          return NextResponse.json(
            { 
              message: 'Authentication failed',
              hint: 'Check if you need an app-specific password for your email provider'
            },
            { status: 500 }
          );
        } else if (errorObj.code === 'ETIMEDOUT') {
          return NextResponse.json(
            { 
              message: 'Connection timed out',
              hint: 'Check network connectivity and firewall settings'
            },
            { status: 500 }
          );
        } else if (errorObj.code === 'ECONNECTION') {
          return NextResponse.json(
            { 
              message: 'Connection failed',
              hint: 'Check email settings and network connection'
            },
            { status: 500 }
          );
        } else if (errorObj.message) {
          return NextResponse.json(
            { 
              message: errorObj.message,
              hint: 'Check your email configuration'
            },
            { status: 500 }
          );
        }
      }
      
      throw verifyError;
    }

    // Create nicely formatted email content
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

    // Send the email
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

    console.log('Contact form email sent successfully:', info.messageId);
    
    return NextResponse.json({ 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
    
  } catch (error: unknown) {
    console.error('Error sending contact form email:', error);

    // Provide specific error messages based on the type of error
    let errorMessage = 'Failed to send email';
    let hint = '';
    
    if (error instanceof Error) {
      const errorObj = error as { code?: string; responseCode?: number };
      if (errorObj.code === 'EAUTH' || errorObj.responseCode === 535) {
        errorMessage = 'Authentication failed';
        hint = 'Check if you need an app-specific password for your email provider';
      } else if (errorObj.code === 'ECONNECTION') {
        errorMessage = 'Connection failed';
        hint = 'Check email settings and network connection';
      } else if (errorObj.code === 'ETIMEDOUT') {
        errorMessage = 'Connection timed out';
        hint = 'Check network connectivity and firewall settings';
      } else if (errorObj.code === 'ESOCKET') {
        errorMessage = 'Socket error';
        hint = 'Possible TLS/SSL configuration issue';
      } else if (error.message) {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { 
        message: errorMessage,
        hint: hint,
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
        code: error instanceof Error ? (error as { code?: string }).code : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 * Returns a clear error message for methods that aren't allowed
 */
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