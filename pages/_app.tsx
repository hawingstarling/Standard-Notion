import { ThemeProvider } from '../src/Context/ThemeProvider'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="notion-theme"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
