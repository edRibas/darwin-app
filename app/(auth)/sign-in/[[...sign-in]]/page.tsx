// Import the SignIn component from the Clerk library
import { SignIn } from "@clerk/nextjs";

// Define a Next.js page component
export default function Page() {
  // Render the SignIn component, which displays a sign-in form
  return <SignIn />;
}