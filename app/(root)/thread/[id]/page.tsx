// Import necessary modules and components
import ThreadCard from "@/components/cards/ThreadCard"; // Import a ThreadCard component for displaying threads and comments
import Comment from "@/components/forms/Comment"; // Import a Comment component for adding comments to threads
import { fetchThreadById } from "@/lib/actions/thread.actions"; // Import a function to fetch thread data by ID
import { fetchUser } from "@/lib/actions/user.actions"; // Import a function to fetch user data
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { redirect } from "next/navigation"; // Import a navigation function from Next.js

// Define the page function
async function page({ params }: { params: { id: string } }) {
  // Check if a thread ID is provided, if not, return null and exit
  if (!params.id) return null;

  // Get the current user using the currentUser function
  const user = await currentUser();

  // If there is no user, return null and exit
  if (!user) return null;

  // Fetch additional user information using the user's ID
  const userInfo = await fetchUser(user.id);

  // If the user is not onboarded, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch thread data based on the provided thread ID
  const thread = await fetchThreadById(params.id);

  // Render the page with a ThreadCard for the main thread, a Comment component for adding comments,
  // and ThreadCards for displaying child comments
  return (
    <section className="relative">
      <div>
        {/* Render a ThreadCard component for the main thread */}
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        {/* Render a Comment component for adding comments to the thread */}
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          // Render ThreadCard components for displaying child comments
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

// Export the page function as the default export of this module
export default page;
