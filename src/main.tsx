import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from 'next-themes'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    storageKey="theme"
    disableTransitionOnChange={false}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
)
