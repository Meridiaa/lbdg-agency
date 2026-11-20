
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hello LBDG Agency! I would like to discuss a project."
  );

  return (
    <a
      href={`https://wa.me/919838686391?text=${message}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with LBDG Agency on WhatsApp"
    >
      <span className="whatsapp-tooltip">Let's chat!</span>
      <span className="whatsapp-icon">
        <MessageCircle size={27} />
      </span>
    </a>
  );
}
