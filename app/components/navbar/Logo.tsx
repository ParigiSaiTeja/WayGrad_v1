'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  const logoStyles = {
    height: '100%',  // Take the full height of the parent container
    width: 'auto',   // Maintain aspect ratio
    cursor: 'pointer', // Ensure the logo is clickable
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={logoStyles} onClick={() => router.push('/')}>
      <Image
        src="/images/logo1.png"
        height={150} // Adjust this as needed, but it will scale with the height of the container
        width={150}  // Adjust this as needed, but it will scale with the height of the container
        alt="Logo"
      />
    </div>
  );
}

export default Logo;
