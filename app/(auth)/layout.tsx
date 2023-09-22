// Import necessary modules and components
import React from "react";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import '../globals.css'; // Import global CSS styles

// Define a font (Raleway) with Latin subsets
const raleway = Raleway({ subsets: ["latin"] });

// Metadata for the page (title and description)
export const metadata: Metadata = {
  title: 'Darwin App',
  description: 'A Next.js 13 Social App'
}

// Define the RootLayout component
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    // Wrap the content in a ClerkProvider for authentication
    <ClerkProvider
      appearance={{
        baseTheme: dark, // Use the dark theme from Clerk
      }}
    >
      <html lang="en"> {/* Set the language of the HTML document */}
        <body className={`${raleway.className} bg-dark-1`}> {/* Apply styles to the body */}
          {children} {/* Render the child components */}
        </body>
      </html>
    </ClerkProvider>
  )
}
