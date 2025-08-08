#!/usr/bin/env node

/**
 * Contact API Test Script
 * 
 * This script tests the contact form API to make sure it's working properly.
 * It sends a test message and checks if the server responds correctly.
 * 
 * How to use:
 *   node test-contact-api.js          - Run basic test
 *   node test-contact-api.js --all    - Run all tests including error cases
 */

// Configuration - where to send the test request
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const CONTACT_ENDPOINT = `${BASE_URL}/api/contact`;

/**
 * Main test function - sends a test contact form and checks the response
 */
async function testContactAPI() {
  console.log('🧪 Testing Contact API');
  console.log(`📍 Testing endpoint: ${CONTACT_ENDPOINT}`);
  console.log('=' .repeat(50));

  // Sample contact form data for testing
  const testContactData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the API test script. If you receive this, the contact form is working correctly!'
  };

  try {
    console.log('📤 Sending test contact form...');
    console.log('📋 Test data:', JSON.stringify(testContactData, null, 2));
    
    // Measure how long the request takes
    const startTime = Date.now();
    
    // Send the contact form data to the server
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testContactData),
    });

    const responseTime = Date.now() - startTime;
    console.log(`⏱️  Response time: ${responseTime}ms`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);

    // Check if the request was successful
    if (!response.ok) {
      console.error('❌ Request failed with status:', response.status);
      const errorText = await response.text();
      console.error('💬 Error response:', errorText);
      return;
    }

    // Get the server's response
    const result = await response.json();
    console.log('✅ Success!');
    console.log('📬 Response:', result);
    
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 Test completed successfully!');
    console.log('📧 Check your email at support@carbie.app for the test message.');
    
  } catch (error) {
    console.error('❌ Test failed with error:');
    
    // Helpful error messages for common issues
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('🌐 Network error - is your server running?');
      console.error(`   Try: npm run dev`);
      console.error(`   Or check if ${BASE_URL} is accessible`);
    } else {
      console.error('💥 Unexpected error:', error);
    }
    
    process.exit(1);
  }
}

/**
 * Test what happens when required fields are missing
 */
async function testMissingFields() {
  console.log('\n📝 Test: Missing required fields');
  
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        // Intentionally missing email and message to test validation
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

/**
 * Test what happens with an invalid email format
 */
async function testInvalidEmail() {
  console.log('\n📧 Test: Invalid email format');
  
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email', // Invalid email format
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

/**
 * Test what happens when using the wrong HTTP method
 */
async function testWrongMethod() {
  console.log('\n🔄 Test: Wrong HTTP method');
  
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'GET', // Should be POST for contact form
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

/**
 * Run all tests including error scenarios
 */
async function runAllTests() {
  console.log('🚀 Starting comprehensive API tests...\n');

  // Test 1: Normal contact form submission
  await testContactAPI();
  
  console.log('\n' + '🧪 Testing error scenarios...');
  
  // Test 2: Missing required fields
  await testMissingFields();
  
  // Test 3: Invalid email format
  await testInvalidEmail();
  
  // Test 4: Wrong HTTP method
  await testWrongMethod();
}

// Check command line arguments to decide which tests to run
const commandLineArgs = process.argv.slice(2);

if (commandLineArgs.includes('--all') || commandLineArgs.includes('-a')) {
  runAllTests();
} else {
  // Default: just run the basic contact form test
  testContactAPI();
}