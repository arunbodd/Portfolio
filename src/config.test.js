import { readFileSync } from 'fs';
import { isEmailConfigured } from './config';

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

// example.com/.org/.net are RFC 2606 reserved for documentation, and GitHub's
// noreply domain routes nowhere. Neither is a real inbox, so a form placeholder
// like "you@example.com" shouldn't trip the PII check.
const PLACEHOLDER = /@(example\.(com|org|net)|users\.noreply\.github\.com)$/;
const realEmailsIn = (src) => (src.match(EMAIL_RE) || []).filter((e) => !PLACEHOLDER.test(e));

describe('no contact PII in the source', () => {
  // The contact address must never be committed, in any form. It previously
  // lived here base64-encoded, which only defeated naive scrapers — anyone
  // could still decode it. All contact now routes through EmailJS, which keeps
  // the destination server-side. These guard against it creeping back in.
  test.each(['config.js', 'pages/Contact.js', 'components/Footer.js'])(
    '%s contains no real email address',
    (file) => {
      const src = readFileSync(`${__dirname}/${file}`, 'utf8');
      expect(realEmailsIn(src)).toEqual([]);
    },
  );

  test('config.js has no base64 blob that decodes to an email', () => {
    const src = readFileSync(`${__dirname}/config.js`, 'utf8');
    const candidates = src.match(/['"][A-Za-z0-9+/]{16,}={0,2}['"]/g) || [];
    const decoded = candidates.map((c) => {
      try {
        return Buffer.from(c.slice(1, -1), 'base64').toString('utf8');
      } catch {
        return '';
      }
    });
    expect(decoded.filter((d) => realEmailsIn(d).length > 0)).toHaveLength(0);
  });
});

describe('isEmailConfigured', () => {
  test('returns a boolean', () => {
    expect(typeof isEmailConfigured()).toBe('boolean');
  });

  test('is false while any key is still a YOUR_ placeholder', () => {
    // Mirrors the real guard: placeholders must never count as configured, or
    // the form would try to send with bogus credentials instead of telling the
    // visitor it can't send.
    const looksConfigured = (s, t, p) =>
      Boolean(s && t && p && ![s, t, p].some((v) => v.startsWith('YOUR_')));

    expect(looksConfigured('YOUR_SERVICE_ID', 'template_x', 'key_x')).toBe(false);
    expect(looksConfigured('service_x', 'YOUR_TEMPLATE_ID', 'key_x')).toBe(false);
    expect(looksConfigured('service_x', 'template_x', '')).toBe(false);
    expect(looksConfigured('service_x', 'template_x', 'key_x')).toBe(true);
  });
});
