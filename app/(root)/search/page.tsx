// Import necessary modules and components
import { redirect } from "next/navigation"; // Import a navigation function from Next.js
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import UserCard from "@/components/cards/UserCard"; // Import a UserCard component for displaying user profiles
import Searchbar from "@/components/shared/Searchbar"; // Import a Searchbar component for user search
import Pagination from "@/components/shared/Pagination"; // Import a Pagination component for navigation
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"; // Import functions for fetching user data

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

  // Fetch a list of users based on search parameters
  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  // Render the page with a title, search bar, search results, and pagination
  return (
    <section>
      <h1 className='head-text mb-10'>Search in our community</h1>

      {/* Render a Searchbar component for user search */}
      <Searchbar routeType='search' />

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          // Display a message if there are no search results
          <p className='no-result'>No results found 😔</p>
        ) : (
          <>
            {result.users.map((person) => (
              // Render a UserCard component for each user
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      {/* Render a Pagination component for navigation */}
      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

// Export the Page function as the default export of this module
export default Page;
