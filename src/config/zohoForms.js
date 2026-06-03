/** Zoho form permalinks — set in .env (Vite bakes at build time). */

/** Hackathon registration is served via authenticated backend embed (see RegistrationFormEmbed). */

export const ZOHO_HIRING_PARTNER_FORM_URL =
  import.meta.env.VITE_ZOHO_HIRING_PARTNER_FORM_URL || "";

/** Social share proof — Instagram & LinkedIn claim (Points Tracker). */
export const ZOHO_SOCIAL_SHARE_CLAIM_FORM_URL =
  import.meta.env.VITE_ZOHO_SOCIAL_SHARE_CLAIM_FORM_URL || "";
