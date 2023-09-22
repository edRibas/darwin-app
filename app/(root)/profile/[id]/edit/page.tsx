// Import necessary modules and components
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { redirect } from "next/navigation"; // Import a navigation function from Next.js
import { fetchUser } from "@/lib/actions/user.actions"; // Import a function to fetch user data
import AccountProfile from "@/components/forms/AccountProfile"; // Import a form component for editing the user's profile

// Define the Page function
async function Page() {
  // Get the current user using the currentUser function
  const user = await currentUser();

  // If there is no user, return null and exit
  if (!user) return null;

  // Fetch additional user information using the user's ID
  const userInfo = await fetchUser(user.id);

  // If the user is not onboarded, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Prepare user data for the AccountProfile component
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  // Render the page with a title, description, and the AccountProfile component
  return (
    <>
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Change anything</p>

      <section className='mt-12'>
        {/* Render the AccountProfile component and pass user data */}
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </>
  );
}

// Export the Page function as the default export of this module
export default Page;
