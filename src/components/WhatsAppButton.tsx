import WhatsAppIcon from "./WhatsappIcon";
import "../styles/whatsapp-fab.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919494286653?text=Hi%20FirstStep%20I%27d%20like%20more%20information%20about%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Us"
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
