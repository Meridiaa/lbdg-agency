
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "918160197878";

  const message = encodeURIComponent(
    "Hello! I visited the LBDG Agency website and would like to know more about your services."
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={27} />
      <span>Let's Chat</span>
    </a>
  );
}
