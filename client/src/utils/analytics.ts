// Analytics utility functions
export const getGAMeasurementId = (): string => {
  return import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ';
};

export const getGAScriptTag = () => {
  const measurementId = getGAMeasurementId();
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
};