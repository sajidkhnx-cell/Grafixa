# Grafixa Agency Website - Secure & High Performance

Welcome to the Grafixa Agency website. This project uses a secure architecture where the AI logic is handled server-side to protect API keys.

## 🔒 Security & Architecture

This project has been refactored to prevent API key leaks and now uses **Google Gemini API**:
1.  **Frontend**: React components (in `components/Chatbot.tsx`) strictly handle UI. They send messages to `/api/chat`.
2.  **Backend**: A Serverless Function (`api/chat.ts`) handles the communication with Google Gemini using the `@google/genai` SDK.
3.  **Environment**: The `API_KEY` is stored in the server environment and never sent to the browser.

---

## 🛠️ How to Run Locally

Because this project now uses serverless functions for security, you should use the **Vercel CLI** to run it locally. Standard `vite` or `npm start` might not route the `/api` requests correctly.

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Setup Environment**:
    Set your Gemini API Key in your environment or Vercel settings as `API_KEY`.

3.  **Run Development Server**:
    ```bash
    vercel dev
    ```
    This will start the frontend and the API backend together at `http://localhost:3000`.

---

## ☁️ Deployment

When deploying to Vercel:
1.  Import the project.
2.  Go to **Settings > Environment Variables**.
3.  Add `API_KEY` (Value: your Gemini API key).
4.  Deploy.

Vercel will automatically detect `api/chat.ts` and deploy it as a serverless function.

---

## 📂 Project Structure

- **`api/`**: Server-side logic. Contains `chat.ts` which securely calls Google Gemini.
- **`src/components/Chatbot.tsx`**: The chat UI. Calls the local API endpoint.
- **`src/constants.tsx`**: Website content and translations.
- **`src/App.tsx`**: Main application layout including "Scroll to Top" functionality.

---

## 📧 Contact & Support

For website changes, edit `constants.tsx`.
For API issues, check the Vercel Function logs.