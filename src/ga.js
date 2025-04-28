/* eslint-disable no-undef */

window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

gtag('js', new Date());

gtag('config', import.meta.env.VITE_GA_UID || 'GA_UID');
gtag('set', 'anonymizeIp', true);
