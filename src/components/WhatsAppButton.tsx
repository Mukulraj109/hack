import WhatsAppIcon from "./WhatsappIcon";
import "../styles/whatsapp-fab.css";

const WHATSAPP_NUMBER = "919494286653";
const WHATSAPP_MESSAGE = "Hi FirstStep! I need help with the hackathon.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp hackathon support"
      className="whatsapp-fab"
    >
      <span className="whatsapp-fab__icon whatsapp-fab__icon--desktop" aria-hidden="true">
        <WhatsAppIcon color="#22c55e" size={20} />
      </span>
      <span className="whatsapp-fab__icon whatsapp-fab__icon--mobile" aria-hidden="true">
        <WhatsAppIcon variant="outline" size={28} />
      </span>
      <span className="whatsapp-fab__label">WhatsApp Us</span>
    </a>
  );
}
