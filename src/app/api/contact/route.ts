import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Input validation function
function validateFormData(data: { name?: string; email?: string; subject?: string; message?: string }) {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Please select a subject');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate the form data
    const validationErrors = validateFormData({ name, email, subject, message });
    
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service not configured. Please contact support.' 
        },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content
    const subjectOptions: { [key: string]: string } = {
      'technical-support': 'Technical Support Request',
      'feature-request': 'Feature Request',
      'bug-report': 'Bug Report',
      'general-inquiry': 'General Inquiry',
      'feedback': 'Feedback'
    };

    const emailSubject = subjectOptions[subject] || 'Contact Form Submission';
    
    const emailContent = `
      New contact form submission from Carbie website:
      
      Name: ${name}
      Email: ${email}
      Subject: ${emailSubject}
      
      Message:
      ${message}
      
      ---
      This email was sent from the Carbie contact form.
    `;

    // Send email
    const mailOptions = {
      from: emailUser,
      to: 'support@carbie.app',
      subject: `Carbie Contact: ${emailSubject}`,
      text: emailContent,
      replyTo: email, // This allows you to reply directly to the user
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 