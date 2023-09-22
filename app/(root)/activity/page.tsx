// Import necessary modules and components
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { redirect } from "next/navigation"; // Import a navigation function from Next.js
import { fetchUser, getActivity } from "@/lib/actions/user.actions"; // Import functions to fetch user data and activity

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

  // Fetch the user's activity
  const activity = await getActivity(userInfo._id);

  // Render the page
  return (
    <>
      <h1 className='head-text'>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (

              // Create a link to a thread based on activity
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className='activity-card'>
                  <Image
                    src={activity.author.image}
                    alt='user_logo'
                    width={20}
                    height={20}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-primary-500'>
                      {activity.author.name}
                    </span>{" "}
                    replied to you
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (

          // Display a message if there is no activity
          <p className='!text-base-regular text-light-3'>No activity yet...</p>
        )}
      </section>
    </>
  );
}

// Export the Page function as the default export of this module
export default Page;
