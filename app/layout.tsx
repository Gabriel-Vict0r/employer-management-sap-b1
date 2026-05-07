import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar/sidebar";
import { Header } from "@/components/Header/header";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export const metadata = {
  title: "Gestão de colaboradores",
  description: "Sistema para gestão de colaboradores utilizando SAP Business One",
}
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
      about="Gestão de colaboradores"
      title="Gestão de colaboradores"
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
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
