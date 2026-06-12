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

// The contact email is base64-encoded and only decoded at runtime, so the
// literal address never appears as plain text or a mailto: in the static HTML
// or JS bundle — defeating the common email-harvesting scrapers that fuel spam.
const _enc = 'YXJ1bmJvZGRAb3V0bG9vay5jb20=';

export const getContactEmail = () => {
  try {
    return typeof atob === 'function' ? atob(_enc) : '';
  } catch {
    return '';
  }
};

// Build a mailto: URL on demand (optionally with ?subject=…&body=… params).
export const buildMailto = (params = '') => {
  const addr = getContactEmail();
  return addr ? `mailto:${addr}${params}` : '#';
};

// Open the user's mail client without ever rendering the address in the DOM.
export const openEmail = (params = '') => {
  const url = buildMailto(params);
  if (url !== '#') window.location.href = url;
};
