import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from '@/components/providers/WalletProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import ErrorSuppression from '@/components/ErrorSuppression';
import AIChatAssistant from '@/components/AIChatAssistant';
import SocialFloatingWidget from '@/components/SocialFloatingWidget';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolX Engine",
  description: "AI-Powered Token Genesis & Growth Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ErrorSuppression />
        <QueryProvider>
          <WalletProvider>
            {children}
            <AIChatAssistant />
            <SocialFloatingWidget />
          </WalletProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
