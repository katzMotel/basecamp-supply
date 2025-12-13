import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StoreProvider } from "@/lib/redux/StoreProvider";
import { Toaster } from "sonner";
import { Bebas_Neue} from 'next/font/google';

const bebas_neue = Bebas_Neue({ 
  subsets: ['latin'],
  weight: '400', // Bold weights for headings
  variable: '--font-heading',
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
    <html lang="en" suppressHydrationWarning className={bebas_neue.variable}>
      <body>
      <StoreProvider>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}