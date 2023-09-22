// Import necessary modules and components
import PostThread from "@/components/forms/PostThread"; // Import a PostThread component for creating a post
import { fetchUser } from "@/lib/actions/user.actions"; // Import a function to fetch user data
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { redirect } from "next/navigation"; // Import a navigation function from Next.js

// Define the Page function
async function Page() {
  // Get the current user using the currentUser function
  const user = await currentUser();

  // If there is no user, return null and exit
  if (!user) return null;

  // Fetch additional user information using the user's ID
  const userInfo = await fetchUser(user.id);

  // If the user is not onboarded, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect('/onboarding');

  // Render the page with a title and the PostThread component for creating a post
  return (
    <>
      <h1 className="head-text">Create Post</h1>

      {/* Render the PostThread component and pass the user's ID */}
      <PostThread userId={userInfo._id} />
    </>
  );
}

// Export the Page function as the default export of this module
export default Page;
