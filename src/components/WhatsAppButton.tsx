import WhatsAppIcon from './WhatsappIcon';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919494286653?text=Hi%20FirstStep%20I%27d%20like%20more%20information%20about%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Us"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        padding: '12px 16px',
        borderRadius: '16px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
    >
      <WhatsAppIcon color="#22c55e" size={20} />
      <span style={{ fontSize: '14px', fontWeight: 500, color: '#000000' }}>WhatsApp Us</span>
    </a>
  );
}
