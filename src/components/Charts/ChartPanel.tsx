import { useState } from 'react';
import { useCityStore } from '../../stores/cityStore';
import { GenderChart } from './GenderChart';
import { WikipediaChart } from './WikipediaChart';

export const ChartPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCity = useCityStore((state) => state.selectedCity);

  if (!selectedCity) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`chart-toggle-btn ${isOpen ? 'hidden' : ''}`}
        aria-label="Show charts"
      >
        <i className="fas fa-chart-pie"></i>
      </button>

      {/* Chart Panel */}
      {isOpen && (
        <div className="chart-panel">
          <button
            onClick={() => setIsOpen(false)}
            className="chart-close-btn"
            aria-label="Close charts"
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="charts-container">
            <GenderChart data={selectedCity.datos} cityName={selectedCity.name} />
            <div className="chart-spacer"></div>
            <WikipediaChart data={selectedCity.datos} />
          </div>
        </div>
      )}
    </>
  );
};
