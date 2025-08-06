# Email Setup for Contact Form

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail Setup Instructions

For Gmail, you'll need to use an App Password instead of your regular password:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to App passwords
5. Generate a new app password for "Mail"
6. Use that password in the `EMAIL_PASS` variable

## Other Email Providers

You can also use other email providers by changing the service in the API route:

- **Outlook/Hotmail**: Change `service: 'gmail'` to `service: 'outlook'`
- **Yahoo**: Change `service: 'gmail'` to `service: 'yahoo'`
- **Custom SMTP**: Use the following configuration instead:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Your email credentials are completely hidden from the frontend
- All form submissions are validated server-side 