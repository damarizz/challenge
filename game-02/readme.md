# Gilded Rose Kata – TypeScript Refactored Solution

This is a clean, object-oriented and fully tested implementation of the classic Gilded Rose Refactoring Kata, written in TypeScript. It follows best practices including SOLID principles, self-documenting code, and 100% test coverage using Mocha.

## 🧠 Problem Summary

The Gilded Rose is a shop that sells various items. Each item has:

- `name`: the item name
- `sellIn`: number of days left to sell the item
- `quality`: how valuable the item is

Every day, the system updates these properties following specific rules. The code you receive is hardcoded and messy — your task is to refactor it while keeping its behavior intact.

## ✅ Refactored Solution Highlights

- Uses Strategy Pattern to encapsulate item-specific update logic.
- A factory chooses the correct updater based on item name.
- Adheres to Open/Closed Principle: add new behaviors without modifying existing code.
- Includes unit tests in [`gilded-rose.spec.ts`](./test/gilded-rose.spec.ts) with clear coverage and documentation.

## 🚀 How to Run the Project

1. Install dependencies

```bash
npm install
```

2. Run the tests

```bash
npx mocha
```

All tests should pass, verifying behavior for:
- Default items
- Aged Brie
- Backstage passes
- Sulfuras
- Conjured items
- Mixed inventory scenarios
