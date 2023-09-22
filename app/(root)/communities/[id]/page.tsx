// Import necessary modules and components
import Image from "next/image";
import { currentUser } from "@clerk/nextjs"; // Import the current user from Clerk
import { communityTabs } from "@/constants"; // Import community-related constants
import UserCard from "@/components/cards/UserCard"; // Import a UserCard component
import ThreadsTab from "@/components/shared/ThreadsTab"; // Import a ThreadsTab component
import ProfileHeader from "@/components/shared/ProfileHeader"; // Import a ProfileHeader component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components

import { fetchCommunityDetails } from "@/lib/actions/community.actions"; // Import a function to fetch community details

// Define the Page function
async function Page({ params }: { params: { id: string } }) {
  // Get the current user using the currentUser function
  const user = await currentUser();

  // If there is no user, return null and exit
  if (!user) return null;

  // Fetch community details based on the provided ID
  const communityDetails = await fetchCommunityDetails(params.id);

  // Render the page with community details and tabs
  return (
    <section>
      {/* Render a ProfileHeader component with community details */}
      <ProfileHeader
        accountId={communityDetails.createdBy.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type='Community'
      />

      <div className='mt-9'>
        {/* Render a set of tabs for community navigation */}
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab) => (
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
                    {communityDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Render the content for the 'Threads' tab */}
          <TabsContent value='threads' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>

          {/* Render the content for the 'Members' tab */}
          <TabsContent value='members' className='mt-9 w-full text-light-1'>
            <section className='mt-9 flex flex-col gap-10'>
              {communityDetails.members.map((member: any) => (
                // Render UserCard components for each member
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType='User'
                />
              ))}
            </section>
          </TabsContent>

          {/* Render the content for the 'Requests' tab */}
          <TabsContent value='requests' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// Export the Page function as the default export of this module
export default Page;
