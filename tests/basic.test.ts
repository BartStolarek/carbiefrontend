/**
 * Basic Test Suite
 * 
 * Simple tests to verify that the testing environment is working correctly.
 * These tests ensure that Jest and the testing setup are functioning properly.
 */
describe('Basic Test', () => {
  it('should perform basic arithmetic operations', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle asynchronous operations correctly', async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
}); 