// ─────────────────────────────────────────────────────────────
//  Runtime config. Values come from .env (REACT_APP_* — CRA convention).
//  Fill these in .env, then restart `npm start` for changes to apply.
// ─────────────────────────────────────────────────────────────

export const EMAILJS = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
};

// True only when all three keys are present and not the placeholder values.
export const isEmailConfigured = () => {
  const { serviceId, templateId, publicKey } = EMAILJS;
  return Boolean(
    serviceId && templateId && publicKey &&
    ![serviceId, templateId, publicKey].some((v) => v.startsWith('YOUR_')),
  );
};

// Your Calendly scheduling link.
export const CALENDLY_URL =
  process.env.REACT_APP_CALENDLY_URL || 'https://calendly.com/arunbodd/1-on-1-with-arun';

export const CONTACT_EMAIL = 'arunbodd@outlook.com';
