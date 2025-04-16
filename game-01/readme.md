# Don't Permute – TypeScript Solution

This is a clean, performant, and fully tested implementation of the **Don't Permute** challenge, written in TypeScript. It follows clean code principles, is self-documented, and ensures optimal time and space complexity.

## 🧠 Problem Summary

Let `M` be a non-empty set of integers. The task is to find the first subset of two numbers in `M` whose sum equals a given target `N`.

For example:

```ts
M = [2, 5, 8, 14, 0]
N = 10
Result = [2, 8]
```

You must implement a function that receives:
- an array of integers M
- a target integer N

It should return:
- a pair of integers [a, b] such that a + b === N

The function must return the first valid solution found, in the order of the input.

## ✅ Solution Highlights
Uses a single-pass hash set strategy for efficient lookup.

- Time Complexity: O(n)
- Space Complexity: O(n) in the worst case
- Includes test cases with edge coverage and input validation.

Edge Cases Considered:
- Negative numbers
- Zero
- Duplicate values
- No solution found

## 🔧 How to Run the Project

1. Install dependencies

```bash
npm install
```

2. Run the tests

```bash
npm test
```

Test cases are located in findPairSummingToN.test.ts and validate behavior for:
- Basic scenarios
- Edge cases
- Inputs with no solution

## 🚀 Why this approach?
- Ensures readability and extensibility.
- Optimized for performance and memory efficiency.
- Easily testable and maintainable.
- Future-proof: Can be extended to support more complex combinations (e.g. 3-sum, k-sum) or input validations.
