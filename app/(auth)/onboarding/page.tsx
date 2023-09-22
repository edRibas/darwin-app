// Import necessary modules and components
import { currentUser } from "@clerk/nextjs"; // Importing the current user from a Clerk package
import { redirect } from "next/navigation"; // Importing a redirect function from Next.js
import { fetchUser } from "@/lib/actions/user.actions"; // Importing a function to fetch user data
import AccountProfile from "@/components/forms/AccountProfile"; // Importing a component for the account profile

// Define an asynchronous function named Page
async function Page() {
  // Get the current user using the currentUser function
  const user = await currentUser();

  // If there is no user, return null and exit
  if (!user) return null;

  // Fetch additional user information using the user's ID
  const userInfo = await fetchUser(user.id);

  // If the user is already onboarded, redirect to another page
  if (userInfo?.onboarded) redirect("/");

  // Prepare user data by combining information from different sources
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  // Return the JSX for rendering the page
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Finish your profile creation to start using the Darwin App
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        {/* Render the AccountProfile component with user data */}
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

// Export the Page function as the default export of this module
export default Page;
