// Import necessary modules and components
import Image from "next/image";
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { redirect } from "next/navigation"; // Import a navigation function from Next.js
import { profileTabs } from "@/constants"; // Import profile-related constants
import ThreadsTab from "@/components/shared/ThreadsTab"; // Import a ThreadsTab component
import ProfileHeader from "@/components/shared/ProfileHeader"; // Import a ProfileHeader component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { fetchUser } from "@/lib/actions/user.actions"; // Import a function to fetch user data

// Define the Page function
async function Page({ params }: { params: { id: string } }) {
  // Get the current user using the currentUser function
  const user = await currentUser();

  // If there is no user, return null and exit
  if (!user) return null;

  // Fetch user information based on the provided user ID
  const userInfo = await fetchUser(params.id);

  // If the user is not onboarded, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Render the page with the user's profile details and tabs for navigation
  return (
    <section>
      {/* Render a ProfileHeader component with user information */}
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className='mt-9'>
        {/* Render a set of tabs for profile navigation */}
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {/* Display the number of threads for the 'Threads' tab */}
                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* Render the ThreadsTab component for each tab */}
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

// Export the Page function as the default export of this module
export default Page;
