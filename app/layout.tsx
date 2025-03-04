import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react"
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "DTU 2k21, 2k22 and 2k23 result analyser",
  description: "Analyze and compare Delhi Technological University (DTU) admission results and statistics for students admitted in 2021, 2022 and 2023.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'google-adsense-account': 'ca-pub-7529178369694237'
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>
            <Analytics />
            <Provider>
              {children}
            </Provider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
