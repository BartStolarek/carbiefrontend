#!/usr/bin/env node

/**
 * Simple SMTP connection test for Zoho
 * Usage: node test-smtp.js
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSMTPConnection() {
  console.log('🔍 Testing SMTP Connection to Zoho\n');
  console.log('Configuration:');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('User:', process.env.SMTP_USER);
  console.log('Password set:', !!process.env.SMTP_PASS);
  console.log('=' .repeat(50));

  // Test different configurations
  const configs = [
    {
      name: 'Port 587 (TLS)',
      host: process.env.SMTP_HOST || 'smtp.zoho.com.au',
      port: 587,
      secure: false,
    },
    {
      name: 'Port 465 (SSL)',
      host: process.env.SMTP_HOST || 'smtp.zoho.com.au',
      port: 465,
      secure: true,
    },
    {
      name: 'Global server - Port 587',
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
    },
    {
      name: 'Pro server - Port 587',
      host: 'smtppro.zoho.com',
      port: 587,
      secure: false,
    }
  ];

  for (const config of configs) {
    console.log(`\n📧 Testing: ${config.name}`);
    console.log(`   Host: ${config.host}`);
    console.log(`   Port: ${config.port}`);
    console.log(`   Secure: ${config.secure}`);
    
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
        ciphers: 'SSLv3'
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      debug: true,
      logger: true
    });

    try {
      await transporter.verify();
      console.log('✅ Connection successful!');
      
      // Try to send a test email
      console.log('📤 Attempting to send test email...');
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_FROM,
        subject: 'SMTP Test - ' + config.name,
        text: 'This is a test email from the SMTP connection test script.',
        html: '<p>This is a <b>test email</b> from the SMTP connection test script.</p>'
      });
      
      console.log('✅ Email sent successfully!');
      console.log('   Message ID:', info.messageId);
      console.log('\n🎉 This configuration works! Use these settings:');
      console.log(`SMTP_HOST=${config.host}`);
      console.log(`SMTP_PORT=${config.port}`);
      
      // Close the connection
      transporter.close();
      return true;
      
    } catch (error) {
      console.log('❌ Connection failed:', error.message);
      if (error.code) console.log('   Error code:', error.code);
      if (error.command) console.log('   Command:', error.command);
      if (error.response) console.log('   Response:', error.response);
      
      // Close the connection
      transporter.close();
    }
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('❌ All configurations failed.');
  console.log('\nPossible issues:');
  console.log('1. Check if the app-specific password is correct');
  console.log('2. Verify SMTP is enabled in Zoho Mail settings');
  console.log('3. Check if your Zoho account has any IP restrictions');
  console.log('4. Try regenerating the app-specific password');
  console.log('5. Check firewall/network blocks on ports 465/587');
  
  return false;
}

// Run the test
testSMTPConnection().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});