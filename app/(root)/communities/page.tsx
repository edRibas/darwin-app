// Import necessary modules and components
import Searchbar from "@/components/shared/Searchbar"; // Import a Searchbar component
import Pagination from "@/components/shared/Pagination"; // Import a Pagination component
import CommunityCard from "@/components/cards/CommunityCard"; // Import a CommunityCard component
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { redirect } from "next/navigation"; // Import a navigation function from Next.js
import { fetchUser } from "@/lib/actions/user.actions"; // Import a function to fetch user data
import { fetchCommunities } from "@/lib/actions/community.actions"; // Import a function to fetch community data

// Define the Page function
async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Get the current user using the currentUser function
  const user = await currentUser();

  // If there is no user, return null and exit
  if (!user) return null;

  // Fetch additional user information using the user's ID
  const userInfo = await fetchUser(user.id);

  // If the user is not onboarded, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch a list of communities based on search parameters
  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  // Render the page with the list of communities
  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-5'>

        {/* Render a Searchbar component for communities */}
        <Searchbar routeType='communities' />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        {result.communities.length === 0 ? (

          // Display a message if there are no search results
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (

              // Render a CommunityCard component for each community
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      {/* Render a Pagination component for navigation */}
      <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

// Export the Page function as the default export of this module
export default Page;
