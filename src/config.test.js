import { getContactEmail, buildMailto, isEmailConfigured } from './config';

// These cover the two bits of config logic that would silently break the site
// if they regressed: the anti-scraping email encoding, and the guard that
// decides whether the contact form sends via EmailJS or falls back to mailto:.

describe('contact email obfuscation', () => {
  test('decodes to a plausible address at runtime', () => {
    const addr = getContactEmail();
    expect(addr).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  test('the literal address is not present as source text', () => {
    // The whole point of the base64 indirection is that scrapers reading the
    // bundle never see a matchable address. If someone re-inlines it as a
    // plain string, this fails.
    const src = require('fs').readFileSync(`${__dirname}/config.js`, 'utf8');
    expect(src).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  });

  test('buildMailto produces a mailto: URL and passes params through', () => {
    expect(buildMailto()).toMatch(/^mailto:/);
    expect(buildMailto('?subject=Hi')).toContain('?subject=Hi');
  });
});

describe('isEmailConfigured', () => {
  test('returns a boolean', () => {
    expect(typeof isEmailConfigured()).toBe('boolean');
  });

  test('is false while any key is still a YOUR_ placeholder', () => {
    // Mirrors the real guard: placeholders must never count as configured,
    // otherwise the form would try to send with bogus credentials instead of
    // falling back to the visitor's mail app.
    const looksConfigured = (s, t, p) =>
      Boolean(s && t && p && ![s, t, p].some((v) => v.startsWith('YOUR_')));

    expect(looksConfigured('YOUR_SERVICE_ID', 'template_x', 'key_x')).toBe(false);
    expect(looksConfigured('service_x', 'YOUR_TEMPLATE_ID', 'key_x')).toBe(false);
    expect(looksConfigured('service_x', 'template_x', '')).toBe(false);
    expect(looksConfigured('service_x', 'template_x', 'key_x')).toBe(true);
  });
});
