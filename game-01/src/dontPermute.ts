// Finds the first pair of numbers in the array that sum to the given target.
// Returns the pair as a tuple [a, b], or null if no such pair exists.
export function findPairSummingToN(arr: number[], target: number): [number, number] | null {
  // A set to keep track of numbers we've seen so far.
  const seen = new Set<number>();

  // Iterate over each number in the input array.
  for (const num of arr) {
    // Calculate the complement that would complete the pair to sum to the target.
    const complement = target - num;

    // If the complement has already been seen, we found a valid pair.
    if (seen.has(complement)) {
      return [complement, num];
    }

    // Otherwise, add the current number to the set for future checks.
    seen.add(num);
  }

  // If no valid pair was found, return null.
  return null;
}
