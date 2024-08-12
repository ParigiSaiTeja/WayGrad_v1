'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeMessage, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface MessageCardProps {
  data: SafeMessage;
  user: SafeUser;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const MessageCard: React.FC<MessageCardProps> = ({
  data,
  user,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleContactSeller = () => {
    const phoneNumber = ''; // Replace with the correct field for the phone number
    const encodedMessage = encodeURIComponent(
      `Hello ${user?.name}, I'm interested in your listing, which was listed at: ${currentUser}`
    );
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank'); // Open in a new tab
  };

  // Log the message data for debugging
  console.log("Message Data:", data);

  // Transform body text to add line breaks after periods and make the first line bold
  const transformBodyText = (text: string) => {
    const parts = text.split('. ');
    return parts.map((part, index) => (
      <span key={index}>
        <span className={index === 0 ? "font-bold" : ""}>{part}</span>
        {index < parts.length - 1 && '. '}
        <br />
      </span>
    ));
  };

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      // If there is no current user, open the login modal
      return loginModal.onOpen();
    }

    // If there is a current user, perform the action
    onAction?.(actionId);
  };

  return (
    <div
     
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full p-4 border rounded-xl shadow-sm bg-white h-80 overflow-hidden relative transition-all duration-300 ease-in-out group-hover:h-auto">
        
        <div className="font-light text-neutral-500 flex-1 overflow-hidden group-hover:overflow-visible">
          <div className="break-words whitespace-pre-wrap">
            {transformBodyText(data.body)}
          </div>
        </div>
        <Button
          disabled={disabled}
          small
          label="Contact Seller"
          onClick={handleAction}
        />
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleAction}
          />
        )}
      </div>
    </div>
  );
}

export default MessageCard;
