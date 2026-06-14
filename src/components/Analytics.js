import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_ID } from '../config';

// Loads Google Analytics 4 only when a Measurement ID is configured, and sends
// a page_view on each route change (SPA navigations aren't auto-tracked).
let injected = false;

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID || injected) return;
    injected = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line func-names
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (GA_ID && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

export default Analytics;
