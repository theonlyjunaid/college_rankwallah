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

export const metadata: Metadata = {
  title: "DTU 2k21, 2k22 and 2k23 result analyser",
  description: "Analyze and compare Delhi Technological University (DTU) admission results and statistics for students admitted in 2021, 2022 and 2023.",
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
            {children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
