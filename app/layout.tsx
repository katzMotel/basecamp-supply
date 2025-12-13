import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StoreProvider } from "@/lib/redux/StoreProvider";
import { Toaster } from "sonner";
import { Bebas_Neue, Open_Sans } from 'next/font/google';
import { Footer } from "@/components/Footer";
const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-heading',  // Changed: removed --
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-body',  // Changed: removed --
});

export const metadata: Metadata = {
  title: "Basecamp Supply",
  description: "Premium outdoor gear and equipment for your next adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${openSans.variable}`}>
      <body>
        <StoreProvider>
          <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer />
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}