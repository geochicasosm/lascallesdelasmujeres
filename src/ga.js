window.dataLayer = window.dataLayer || [];

function gtag(...args) {
  dataLayer.push(args);
}

gtag('js', new Date());

gtag('config', import.meta.env.VITE_GA_UID || 'GA_UID');
gtag('set', 'anonymizeIp', true);
