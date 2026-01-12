# 📈 Nocturn: AI-Powered Modern Stock Market Platform

Nocturn is a high-performance, real-time financial dashboard designed for modern investors. Built with **Next.js**, it leverages event-driven workflows to provide AI-driven insights, sentiment analysis, and instant price alerts.

### 🛠 Tech Stack

<p align="center">
<img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=next.js&color=black"/>
<img src="https://img.shields.io/badge/-Better Auth-black?style=for-the-badge&logoColor=white&logo=betterauth&color=black"/>
<img src="https://img.shields.io/badge/-Shadcn-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=black"/>
<img src="https://img.shields.io/badge/-Inngest-black?style=for-the-badge&logoColor=white&logo=inngest&color=black"/>
<img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=00A35C"/>
<img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=38B2AC"/>
<img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6"/>
</p>

- **Frontend:** Next.js (App Router), Shadcn UI, TailwindCSS
- **Backend/Workflows:** Inngest (Event-driven background jobs)
- **Database:** MongoDB (NoSQL for flexible financial data)
- **Auth:** Better Auth (MFA, Social Sync, Session Management)
- **Data:** Finnhub API (Real-time market & fundamental data)
- **Email:** Nodemailer (Alerts & daily digests)

---

## ✨ Key Features

- Real-Time Dashboard:** Interactive candlestick and line charts with live price updates for stocks, forex, and crypto.
- AI-Driven Insights:** Automated market summaries, sentiment analysis, and daily digests powered by Inngest workflows.
- Company Deep-Dives:** Access PE ratios, EPS, analyst ratings, and SEC filings in one view.
- Intelligent Search:** Fast, filtered search by industry, performance, or market cap.


Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/louals/stocks-app
cd stocks-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# FINNHUB
NEXT_PUBLIC_NEXT_PUBLIC_FINNHUB_API_KEY=
FINNHUB_BASE_URL=https://finnhub.io/api/v1

# MONGODB
MONGODB_URI=

# BETTER AUTH
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# GEMINI
GEMINI_API_KEY=

#NODEMAILER
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

Replace the placeholder values with your real credentials. You can get these by signing up at: [**MongoDB**](https://www.mongodb.com/products/platform/atlas-database), [**Gemini**](https://aistudio.google.com/prompts/new_chat?utm_source=chatgpt.com), [**Inngest**](https://jsm.dev/stocks-inggest), [**Finnhub**](https://finnhub.io).

**Running the Project**

```bash
npm run dev
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
