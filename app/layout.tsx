import "./globals.css"
import { Inter } from "next/font/google"
import { Navbar } from "./components/navbar"
import { Sidebar } from "./components/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AIChatbot } from "@/components/ai-chatbot"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "D-CFT: Decentralized Carbon Footprint Tracker",
  description: "AI-powered, blockchain-based carbon footprint tracking and rewards",
    generator: 'ujjwal sinha'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 h-[calc(100vh-64px)]">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
            <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-4">
              <ThemeToggle />
              <AIChatbot />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'