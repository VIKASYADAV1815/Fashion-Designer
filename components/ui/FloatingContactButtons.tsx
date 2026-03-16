
"use client";
import { Phone, MessageCircle } from 'lucide-react';

const FloatingContactButtons = () => {
  const phoneNumber = "8755278888";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const telUrl = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-3 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href={telUrl}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
        aria-label="Call us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingContactButtons;
