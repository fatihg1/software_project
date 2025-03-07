Setup Guide

This guide provides step-by-step instructions to set up the project, including installing dependencies and configuring authentication using Clerk.

Prerequisites

Ensure you have the following installed on your system:

Git (Download Git)

Node.js (LTS version recommended) (Download Node.js) (Version:22.14.0)

npm (Version:11.1.0) (Comes with Node.js) or yarn

1️⃣ Clone the Repository

git clone (https://github.com/fatihg1/software_project)

2️⃣ Install Node.js

If Node.js is not installed, download and install it from Node.js official website.
Verify installation:

node -v
npm -v

3️⃣ Create a React App with Vite

npm create vite@latest .

Select React and choose JavaScript or TypeScript based on your preference.

After setup, install dependencies:

npm install

4️⃣ Install Tailwind CSS with Vite

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Configure tailwind.config.js by adding:

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

Add Tailwind directives in src/index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

5️⃣ Install React Router DOM

npm install react-router-dom

6️⃣ Install Clerk Authentication

npm install @clerk/clerk-react

7️⃣ Install Lucide Icons

npm install lucide-react

8️⃣ Install Framer Motion

npm install framer-motion

9️⃣ Configure Environment Variables

Ensure there is an .env file in your directory with the following line in its contents:

VITE_CLERK_PUBLISHABLE_KEY=pk_test_cmVsYXRlZC1zd2FuLTY3LmNsZXJrLmFjY291bnRzLmRldiQ

Make sure to restart the server after modifying .env.

🔟 Run the Development Server

npm run dev

This will start a local development server, usually at http://localhost:5173/.

You can find more resources for improving this project:

https://tailwindcss.com
https://react.dev
