import { expect } from 'chai';
import { findPairSummingToN } from '../src/dontPermute.js';

describe('findPairSummingToN', () => {
  // Basic case: returns the first valid pair that sums to the target
  it('returns the first pair that sums to N', () => {
    const result = findPairSummingToN([2, 5, 8, 14, 0], 10);
    expect(result).to.deep.equal([2, 8]);
  });

  // No valid pair found
  it('returns null when no pair is found', () => {
    const result = findPairSummingToN([1, 2, 3], 10);
    expect(result).to.equal(null);
  });

  // Works with negative integers
  it('works with negative numbers', () => {
    const result = findPairSummingToN([-3, 1, 4, 2], -2);
    expect(result).to.deep.equal([-3, 1]);
  });

  // Handles zero as part of a valid pair
  it('handles zero correctly in the input', () => {
    const result = findPairSummingToN([0, 5, 10], 10);
    expect(result).to.deep.equal([0, 10]);
  });

  // Supports duplicate numbers
  it('handles duplicate numbers correctly', () => {
    const result = findPairSummingToN([5, 5, 3], 10);
    expect(result).to.deep.equal([5, 5]);
  });

  // Empty array returns null
  it('returns null for empty array', () => {
    const result = findPairSummingToN([], 10);
    expect(result).to.equal(null);
  });

  // Only one number in array (not enough to form a pair)
  it('returns null if only one element is present', () => {
    const result = findPairSummingToN([5], 10);
    expect(result).to.equal(null);
  });

  // Does not return a number added to itself unless it appears twice
  it('does not return a single number doubled unless it appears twice', () => {
    const result = findPairSummingToN([5, 3], 10);
    expect(result).to.equal(null);
  });

  // Allows using the same number twice if it’s duplicated in the input
  it('allows using the same number twice if duplicated', () => {
    const result = findPairSummingToN([5, 5], 10);
    expect(result).to.deep.equal([5, 5]);
  });
});
