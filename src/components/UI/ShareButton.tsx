import { useState } from 'react';
import { useCityStore } from '../../stores/cityStore';

export const ShareButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const selectedCity = useCityStore((state) => state.selectedCity);

  const handleShare = async () => {
    const url = selectedCity 
      ? `${window.location.origin}${window.location.pathname}#${selectedCity.id}`
      : window.location.href;
    
    const title = selectedCity
      ? `Las Calles de las Mujeres - ${selectedCity.name}`
      : 'Las Calles de las Mujeres';
    
    const text = 'Explora las calles con nombres de mujeres en ciudades de Latinoamérica y España';

    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="share-button-container">
      <button
        className="share-btn"
        onClick={handleShare}
        aria-label="Share"
      >
        <i className="fas fa-share-alt"></i>
      </button>
      {showTooltip && (
        <div className="share-tooltip">
          ¡Enlace copiado!
        </div>
      )}
    </div>
  );
};
