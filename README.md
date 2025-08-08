# Carbie - AI-Powered Nutrition Assistant

A modern web application for Carbie, an AI-powered nutrition assistant that helps users analyze food and track their nutrition journey.

## Features

- **AI Food Analysis**: Photo or text input for instant carb estimates
- **Smart Camera**: Point and shoot for instant analysis
- **Detailed Breakdown**: Ingredient-by-ingredient analysis with nutritional insights
- **Glucose Timing**: Estimates when blood glucose will peak from ingredients
- **Contact Form**: Integrated contact system for user support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Testing**: Jest with React Testing Library
- **Email**: Nodemailer for contact form functionality
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd carbiefrontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following environment variables:
- `SMTP_HOST`: Your email server host
- `SMTP_PORT`: Email server port (587 or 465)
- `SMTP_USER`: Email username
- `SMTP_PASS`: Email password
- `SMTP_FROM`: Sender email address

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests for CI environment

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API
│   ├── help/              # Help page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ContactForm.tsx    # Contact form component
tests/                     # Test files
├── app/                   # App component tests
├── components/            # Component tests
└── api/                   # API route tests
```

## Testing

The project includes comprehensive tests for:
- Component functionality and user interactions
- API endpoint validation and error handling
- Form submission and email functionality
- Accessibility and responsive design

Run tests with:
```bash
npm test
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your project to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For support, please contact the development team or create an issue in the repository.
