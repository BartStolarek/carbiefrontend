#!/usr/bin/env node

/**
 * Test script for the contact API endpoint
 * Usage: node test-contact-api.js
 */

async function testContactAPI() {
  const baseURL = process.env.TEST_URL || 'http://localhost:3000';
  const endpoint = `${baseURL}/api/contact`;
  
  console.log('🧪 Testing Contact API');
  console.log(`📍 Endpoint: ${endpoint}`);
  console.log('=' .repeat(50));

  // Test data
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the API test script. If you receive this, the contact form is working correctly!'
  };

  try {
    console.log('📤 Sending test contact form...');
    console.log('📋 Test data:', JSON.stringify(testData, null, 2));
    
    const startTime = Date.now();
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`⏱️  Response time: ${duration}ms`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      console.error('❌ Request failed with status:', response.status);
      const errorText = await response.text();
      console.error('💬 Error response:', errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ Success!');
    console.log('📬 Response:', result);
    
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 Test completed successfully!');
    console.log('📧 Check your email at support@carbie.app for the test message.');
    
  } catch (error) {
    console.error('❌ Test failed with error:');
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('🌐 Network error - is your server running?');
      console.error(`   Try: npm run dev`);
      console.error(`   Or check if ${baseURL} is accessible`);
    } else {
      console.error('💥 Unexpected error:', error);
    }
    
    process.exit(1);
  }
}

// Test different scenarios
async function runAllTests() {
  console.log('🚀 Starting comprehensive API tests...\n');

  // Test 1: Valid submission
  await testContactAPI();
  
  console.log('\n' + '🧪 Testing edge cases...');
  
  // Test 2: Missing fields
  await testMissingFields();
  
  // Test 3: Invalid email
  await testInvalidEmail();
  
  // Test 4: Wrong HTTP method
  await testWrongMethod();
}

async function testMissingFields() {
  const baseURL = process.env.TEST_URL || 'http://localhost:3000';
  const endpoint = `${baseURL}/api/contact`;
  
  console.log('\n📝 Test: Missing required fields');
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        // missing email and message
      }),
    });

    console.log(`📊 Status: ${response.status}`);
    
    if (response.status === 400) {
      const result = await response.json();
      console.log('✅ Correctly rejected missing fields');
      console.log('💬 Response:', result.message);
    } else {
      console.log('⚠️  Expected 400 status for missing fields');
    }
  } catch (error) {
    console.error('❌ Error testing missing fields:', error);
  }
}

async function testInvalidEmail() {
  const baseURL = process.env.TEST_URL || 'http://localhost:3000';
  const endpoint = `${baseURL}/api/contact`;
  
  console.log('\n📧 Test: Invalid email format');
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message'
      }),
    });

    console.log(`📊 Status: ${response.status}`);
    const result = await response.json();
    console.log('💬 Response:', result.message);
    
  } catch (error) {
    console.error('❌ Error testing invalid email:', error);
  }
}

async function testWrongMethod() {
  const baseURL = process.env.TEST_URL || 'http://localhost:3000';
  const endpoint = `${baseURL}/api/contact`;
  
  console.log('\n🔄 Test: Wrong HTTP method');
  
  try {
    const response = await fetch(endpoint, {
      method: 'GET', // Should be POST
    });

    console.log(`📊 Status: ${response.status}`);
    
    if (response.status === 405) {
      const result = await response.json();
      console.log('✅ Correctly rejected GET method');
      console.log('💬 Response:', result.message);
    } else {
      console.log('⚠️  Expected 405 status for wrong method');
    }
  } catch (error) {
    console.error('❌ Error testing wrong method:', error);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.includes('--all') || args.includes('-a')) {
  runAllTests();
} else {
  testContactAPI();
}