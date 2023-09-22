"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"; // Importing the useRouter hook from Next.js

import { Button } from "../ui/button";

// Define the props expected by the UserCard component
interface Props {
  id: string; // User or community ID
  name: string; // User or community name
  username: string; // User or community username
  imgUrl: string; // URL of the user or community image
  personType: string; // Type of the person (User or Community)
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter(); // Initialize the useRouter hook from Next.js

  const isCommunity = personType === "Community"; // Check if the personType is "Community"

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          {/* Display the user or community image */}
          <Image
            src={imgUrl}
            alt='user_logo'
            fill
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          {/* Display the user or community name */}
          <h4 className='text-base-semibold text-light-1'>{name}</h4>
          {/* Display the user or community username */}
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      {/* Display a "View" button */}
      <Button
        className='user-card_btn'
        onClick={() => {
          // Handle the button click event
          if (isCommunity) {
            // If it's a community, navigate to the community page
            router.push(`/communities/${id}`);
          } else {
            // If it's a user, navigate to the user's profile page
            router.push(`/profile/${id}`);
          }
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
