// Import necessary modules and components
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { redirect } from "next/navigation"; // Import a navigation function from Next.js
import ThreadCard from "@/components/cards/ThreadCard"; // Import a ThreadCard component for displaying posts or threads
import Pagination from "@/components/shared/Pagination"; // Import a Pagination component for navigation
import { fetchPosts } from "@/lib/actions/thread.actions"; // Import a function to fetch posts or threads
import { fetchUser } from "@/lib/actions/user.actions"; // Import a function to fetch user data

async function Home({
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

  // Fetch a list of posts or threads, potentially with pagination
  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1, // Page number from search parameters
    30 // Number of posts or threads per page
  );

  // Render the page with a title, a list of posts or threads, and pagination
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          // Display a message if there are no posts or threads
          <p className="no-result">No posts found...</p>
        ) : (
          <>
            {result.posts.map((post) => (
              // Render a ThreadCard component for each post or thread
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      {/* Render a Pagination component for navigation */}
      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home; // Export the Home component as the default export of this module
