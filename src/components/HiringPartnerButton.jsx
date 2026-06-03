import { ZOHO_HIRING_PARTNER_FORM_URL } from "../config/zohoForms";

const DEFAULT_LABEL = "Become a Partner";

export default function HiringPartnerButton({
  className = "nav-partner-button",
  children = DEFAULT_LABEL,
}) {
  const hasFormUrl = Boolean(ZOHO_HIRING_PARTNER_FORM_URL);

  if (!hasFormUrl) {
    return (
      <a
        href="#"
        className={className}
        aria-disabled="true"
        title="Add VITE_ZOHO_HIRING_PARTNER_FORM_URL to open the hiring partner form"
        onClick={(e) => e.preventDefault()}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={ZOHO_HIRING_PARTNER_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
