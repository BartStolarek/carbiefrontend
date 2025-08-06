// Simple test script for the contact API
// Run this with: node test-contact-api.js

const testData = {
  name: "Test User",
  email: "test@example.com",
  subject: "technical-support",
  message: "This is a test message to verify the contact API is working correctly."
};

async function testContactAPI() {
  try {
    console.log('Testing contact API...');
    console.log('Test data:', testData);
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response body:', result);
    
    if (result.success) {
      console.log('✅ API test passed!');
    } else {
      console.log('❌ API test failed:', result.message);
    }
  } catch (error) {
    console.error('❌ API test error:', error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testContactAPI();
}

module.exports = { testContactAPI }; 