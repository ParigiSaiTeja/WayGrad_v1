'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeMessage, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Button from "../Button";

interface MessageItemsCardProps {
  message: SafeMessage;
  currentUser?: SafeUser | null;
}

const MessageItemsCard: React.FC<MessageItemsCardProps> = ({
  message,
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isHovered, setIsHovered] = useState(false);

  const handleContactSender = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const phoneNumber = message.from.replace("whatsapp:", ""); // Extract phone number from message.from
    const encodedMessage = encodeURIComponent(
      `Hello, I'm interested in your listing category: ${message.categories.join(', ')}`
    );
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank'); // Open in a new tab
  }, [currentUser, loginModal, message.from, message.categories]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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

  return   (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full p-4 border rounded-xl shadow-sm bg-white h-80 overflow-hidden relative transition-all duration-300 ease-in-out group-hover:h-auto">
        <div className="font-semibold text-lg">
          {message.categories.join(', ')} {/* Display categories */}
        </div>
        <div className="font-light text-neutral-500 flex-1 overflow-hidden group-hover:overflow-visible">
          <div className="break-words whitespace-pre-wrap">
            {transformBodyText(message.body)}
          </div>
        </div>
        <Button
          disabled={false}
          small
          label="Contact Sender"
          onClick={handleContactSender}
        />
      </div>
    </div>
  );
}

export default MessageItemsCard;
