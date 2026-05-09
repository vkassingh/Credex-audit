Day 1 prompt: Build the dynamic Spend Input Form with local storage persistence.

Focus: Use react-hook-form and Zustand with persist middleware so a refresh doesn't wipe data.

"I am building a Next.js form using Tailwind and React Hook Form. I need a dynamic form where users can add multiple AI tools from a predefined list (Cursor, Copilot, ChatGPT, etc.). Each entry needs fields for: Plan (dropdown), Seats (number), and Monthly Spend (number). I also need global fields for Team Size and Primary Use Case. Use Zustand with middleware to persist this form state to localStorage. Make the UI clean, using a 'Card' layout for each tool added."


Day 2 prompt: Act as a Senior Financial Analyst. Create a TypeScript function calculateAudit(userData) that takes an array of AI tool objects and returns a detailed breakdown. The function must check for: 1. Seat efficiency (e.g., paying for Team plans for 1 person). 2. Redundancy (e.g., paying for both Cursor and Copilot). 3. API vs. Seat cost (if use case is 'Coding' and spend is high, suggest API-only models). Return an object with 'currentSpend', 'optimizedSpend', and a 'reasoning' string for each tool.