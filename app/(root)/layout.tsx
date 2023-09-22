// Import necessary modules and components
import { dark } from "@clerk/themes"; // Import the dark theme from Clerk
import type { Metadata } from 'next'; // Import Metadata type from Next.js
import { Raleway } from 'next/font/google'; // Import a font from Google Fonts
import { ClerkProvider } from '@clerk/nextjs'; // Import ClerkProvider from Clerk for authentication
import React from "react"; // Import React
import "../globals.css"; // Import global styles
import Topbar from '@/components/shared/Topbar'; // Import a Topbar component
import Bottombar from '@/components/shared/Bottombar'; // Import a Bottombar component
import Rightsidebar from '@/components/shared/Rightsidebar'; // Import a Rightsidebar component
import Leftsidebar from '@/components/shared/Leftsidebar'; // Import a Leftsidebar component

// Define font settings
const raleway = Raleway({ subsets: ['latin'] });

// Define metadata for the application
export const metadata: Metadata = {
  title: 'Darwin',
  description: 'An app built with NextJS 13',
}

// Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Use ClerkProvider to manage the app's appearance and authentication
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {/* Set the language of the HTML document */}
      <html lang="en">
        <body className={raleway.className}>
          {/* Render the Topbar component */}
          <Topbar />

          {/* Create a main container with a flex layout */}
          <main className='flex flex-row'>
            {/* Render the Leftsidebar component */}
            <Leftsidebar />

            {/* Create a section for the main content */}
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children} {/* Render the child components */}
              </div>
            </section>

            {/* Render the Rightsidebar component */}
            <Rightsidebar />
          </main>

          {/* Render the Bottombar component */}
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
