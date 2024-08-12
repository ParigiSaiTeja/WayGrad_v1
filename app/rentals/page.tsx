'use client';

import useLoginModal from "@/app/hooks/useLoginModal"; // Import your login modal hook
import styles from "@/app/page.module.css";
import { SafeUser } from "@/app/types"; // Adjust the import as needed
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const loginModal = useLoginModal(); // Use your login modal hook
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  // Fetch current user when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      // Replace with your logic to fetch the current user
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  // Handle button click for "Post a Sublet"
  const handlePostASubletClick = () => {
    if (!currentUser) {
      // User is not logged in, open login modal
      loginModal.onOpen();
    } else {
      // User is logged in, proceed with the action
      router.push('/api/post-a-sublet'); // Replace with your page or API route
    }
  };

  // Handle button click for "Looking for Sublet"
  const handleLookingForSubletClick = () => {
    router.push('/everysublet'); // Replace with your page or API route
  };

  // Handle button click for "Looking for WhatsApp Sublet"
  const handleLookingForWhatsAppSubletClick = () => {
    router.push('/everysublet'); // Replace with your page or API route
  };

  return (
    <main className={styles.main}>
      <div className={styles.contents}>
        <h1>Your Place</h1>
        <div className={styles.buttons}>
          <button onClick={handleLookingForSubletClick}>Sublets from Listing</button>
          <button onClick={handleLookingForWhatsAppSubletClick}>Sublets from WhatsApp Listing</button>
          <button onClick={handlePostASubletClick}>Post a Sublet</button>
        </div>
      </div>
      <video
        src="/Room.mp4"
        autoPlay
        muted
        loop
        className={styles.video}
      />
    </main>
  );
}

// Simulate fetching the current user (replace with actual implementation)
const getCurrentUser = async (): Promise<SafeUser | null> => {
  // Replace with your actual logic to get the current user
  return null; // Simulate no user logged in for demonstration purposes
};
