import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar/sidebar";
import { Header } from "@/components/Header/header";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body className="block min-h-screen bg-background">
        <ThemeProvider>
          <SidebarProvider className="">
            <AppSidebar />
            <div className="w-full block">
              <Header />
          
          {children}
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
