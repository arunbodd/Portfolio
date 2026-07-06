import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaLinkedin, FaGithub, FaQrcode, FaArrowRight, FaCalendarAlt, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Reveal from '../components/anim/Reveal';
import Magnetic from '../components/anim/Magnetic';
import { Section, Container, Eyebrow } from '../components/ui';
import { EMAILJS, isEmailConfigured, CALENDLY_URL, openEmail, buildMailto } from '../config';

const Head = styled.div`
  max-width: 760px;
  margin: 0 auto 60px;
  text-align: center;
`;

const Big = styled.h2`
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 700;
  color: ${(p) => p.theme.textWhite};
  margin: 18px 0 22px;
  line-height: 1;
`;

const Lead = styled.p`
  font-size: clamp(1.05rem, 2vw, 1.22rem);
  color: ${(p) => p.theme.textSlate};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
  align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Panel = styled.div`
  background: ${(p) => p.theme.lightNavy};
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 34px;
  @media (max-width: 560px) { padding: 24px; }
`;

const PanelTitle = styled.h2`
  font-size: 1.4rem;
  color: ${(p) => p.theme.textLightSlate};
  margin-bottom: 6px;
`;

const PanelSub = styled.p`
  font-size: 0.92rem;
  color: ${(p) => p.theme.textSlate};
  margin-bottom: 26px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.8rem;
  font-family: ${(p) => p.theme.fontMono};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => p.theme.textSlate};

  input, textarea {
    font-family: ${(p) => p.theme.font};
    font-size: 1rem;
    text-transform: none;
    letter-spacing: 0;
    color: ${(p) => p.theme.textLightSlate};
    background: ${(p) => p.theme.navy};
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 13px 15px;
    transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
    width: 100%;
    resize: vertical;
  }
  input:focus, textarea:focus {
    outline: none;
    border-color: ${(p) => p.theme.highlight};
    box-shadow: 0 0 0 3px ${(p) => p.theme.highlightTint};
  }
  input::placeholder, textarea::placeholder { color: ${(p) => p.theme.textMuted}; }
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 28px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  color: #05060b;
  background: ${(p) => p.theme.gradient};
  box-shadow: 0 12px 36px -14px rgba(52, 227, 200, 0.5);
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), opacity 0.3s var(--ease);
  svg { transition: transform 0.3s var(--ease); }
  &:hover:not(:disabled) svg { transform: translateX(4px); }
  &:disabled { opacity: 0.6; cursor: progress; }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  padding: 12px 14px;
  border-radius: 10px;
  background: ${(p) => (p.$kind === 'error' ? 'rgba(224,66,138,0.12)' : p.theme.highlightTint)};
  color: ${(p) => (p.$kind === 'error' ? p.theme.accent3 : p.theme.highlight)};
  border: 1px solid ${(p) => (p.$kind === 'error' ? 'rgba(224,66,138,0.3)' : 'var(--border)')};
`;

const Note = styled.p`
  font-size: 0.78rem;
  color: ${(p) => p.theme.textMuted};
  margin: 14px 0 0;
`;

const CalCard = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  .cal-ic {
    width: 52px; height: 52px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 14px;
    background: ${(p) => p.theme.highlightTint};
    color: ${(p) => p.theme.highlight};
    font-size: 1.4rem;
    margin-bottom: 6px;
  }
`;

const BookBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;
  padding: 14px 24px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  /* Filled gradient with dark text — high contrast in both light and dark. */
  color: #05060b;
  background: ${(p) => p.theme.gradient};
  border: none;
  box-shadow: 0 10px 30px -12px rgba(52, 227, 200, 0.5);
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), filter 0.3s var(--ease);
  svg { color: #05060b; }
  &:hover { transform: translateY(-2px); filter: brightness(1.06); box-shadow: 0 14px 36px -10px rgba(124, 131, 255, 0.55); }
`;

const Tiles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 8px;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const Tile = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: ${(p) => p.theme.navy};
  border: 1px solid var(--border);
  color: ${(p) => p.theme.textSlate};
  transition: transform 0.3s var(--ease), border-color 0.3s var(--ease), color 0.3s var(--ease);
  .ic { color: ${(p) => p.theme.highlight}; font-size: 1.15rem; flex-shrink: 0; }
  .l { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; font-family: ${(p) => p.theme.fontMono}; }
  .v { font-size: 0.85rem; color: ${(p) => p.theme.textLightSlate}; }
  &:hover { transform: translateY(-3px); border-color: ${(p) => p.theme.highlight}; }
`;

const tiles = [
  { icon: <FaEnvelope />, label: 'Email', val: 'Open in mail app', action: 'email' },
  { icon: <FaLinkedin />, label: 'LinkedIn', val: 'in/arunbodd', href: 'https://linkedin.com/in/arunbodd', ext: true },
  { icon: <FaGithub />, label: 'GitHub', val: 'github.com/arunbodd', href: 'https://github.com/arunbodd', ext: true },
  { icon: <IoLocationOutline />, label: 'Location', val: 'Atlanta, GA', href: null },
  { icon: <FaQrcode />, label: 'QR Code', val: 'Share portfolio', to: '/qrcode' },
];

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const configured = isEmailConfigured();

  // Load the Calendly popup widget assets once.
  useEffect(() => {
    if (document.getElementById('calendly-widget-js')) return;
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.id = 'calendly-widget-js';
    js.src = 'https://assets.calendly.com/assets/external/widget.js';
    js.async = true;
    document.body.appendChild(js);
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const name = data.get('from_name');
    const email = data.get('reply_to');
    const message = data.get('message');

    if (!configured) {
      // No EmailJS keys yet → fall back to the visitor's mail client.
      const subject = encodeURIComponent(`Portfolio contact from ${name || 'a visitor'}`);
      const body = encodeURIComponent(`${message || ''}\n\nFrom: ${name || ''} (${email || ''})`);
      window.location.href = buildMailto(`?subject=${subject}&body=${body}`);
      return;
    }

    try {
      setStatus('sending');
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, {
        publicKey: EMAILJS.publicKey,
      });
      setStatus('sent');
      formRef.current.reset();
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <Section id="contact">
      <Container>
        <Reveal>
          <Head>
            <Eyebrow style={{ justifyContent: 'center' }}>Get in touch</Eyebrow>
            <Big>Let's talk.</Big>
            <Lead>
              Open to opportunities and collaborations in bioinformatics, genomics, and
              machine learning. Send a message or grab a time on my calendar.
            </Lead>
          </Head>
        </Reveal>

        <Reveal delay={0.1}>
          <Layout>
            {/* Message form */}
            <Panel>
              <PanelTitle>Send a message</PanelTitle>
              <PanelSub>I'll get back to you within a couple of days.</PanelSub>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Field>
                  Name
                  <input type="text" name="from_name" placeholder="Your name" required />
                </Field>
                <Field>
                  Email
                  <input type="email" name="reply_to" placeholder="you@example.com" required />
                </Field>
                <Field>
                  Message
                  <textarea name="message" rows="5" placeholder="Tell me about your project or question…" required />
                </Field>

                {status === 'sent' && (
                  <Status><FaCheck /> Thanks. Your message is on its way, and I'll reply soon.</Status>
                )}
                {status === 'error' && (
                  <Status $kind="error"><FaExclamationTriangle /> Something went wrong. Please email me directly.</Status>
                )}

                <Magnetic strength={0.25} style={{ alignSelf: 'flex-start' }}>
                  <SubmitBtn type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'} <FaArrowRight />
                  </SubmitBtn>
                </Magnetic>

                {!configured && (
                  <Note>
                    Heads up: EmailJS keys aren't set yet, so this button opens your mail app
                    instead. Add them in <code>.env</code> to enable in-page sending.
                  </Note>
                )}
              </Form>
            </Panel>

            {/* Calendly + quick links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <CalCard>
                <div className="cal-ic"><FaCalendarAlt /></div>
                <PanelTitle>Book a call</PanelTitle>
                <PanelSub style={{ marginBottom: 0 }}>
                  Prefer to talk? Grab a 1:1 slot that works for you.
                </PanelSub>
                <BookBtn type="button" onClick={openCalendly}>
                  <FaCalendarAlt /> Schedule on Calendly
                </BookBtn>
              </CalCard>

              <Tiles>
                {tiles.map((t) => {
                  const props = t.action === 'email'
                    ? { as: 'button', type: 'button', onClick: () => openEmail() }
                    : t.to
                      ? { as: Link, to: t.to }
                      : t.href
                        ? { href: t.href, ...(t.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                        : { as: 'div' };
                  return (
                    <Tile key={t.label} {...props}>
                      <span className="ic">{t.icon}</span>
                      <span>
                        <span className="l" style={{ display: 'block' }}>{t.label}</span>
                        <span className="v">{t.val}</span>
                      </span>
                    </Tile>
                  );
                })}
              </Tiles>
            </div>
          </Layout>
        </Reveal>
      </Container>
    </Section>
  );
};

export default Contact;
