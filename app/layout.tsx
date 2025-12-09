import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StoreProvider } from "@/lib/redux/StoreProvider";

export const metadata: Metadata = {
  title: "CommerceHub",
  description: "Modern e-commerce storefront built with Next.js and Shopify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <StoreProvider>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}