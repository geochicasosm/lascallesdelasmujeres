import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getAllCities, countriesList } from '../../data/cities';
import { ComparisonChart } from './ComparisonChart';
import { StatsTable } from './StatsTable';
import { CityStatsCard } from './CityStatsCard';

type SortKey = 'name' | 'pcFemale' | 'pcMale' | 'pcLink' | 'totalNames';
type SortDir = 'asc' | 'desc';
type ActiveView = 'overview' | 'table';

export const StatsPage = () => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('pcFemale');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [activeView, setActiveView] = useState<ActiveView>('overview');

  const allCities = useMemo(() => getAllCities(), []);

  const filteredCities = useMemo(() => {
    const base =
      selectedCountry === 'all'
        ? allCities
        : countriesList
            .find((c) => c.id === selectedCountry)
            ?.citiesList ?? [];

    return [...base].sort((a, b) => {
      let valA: number | string;
      let valB: number | string;

      if (sortKey === 'name') {
        valA = a.name;
        valB = b.name;
        return sortDir === 'asc'
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }

      valA = a.datos[sortKey] as number;
      valB = b.datos[sortKey] as number;
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });
  }, [allCities, selectedCountry, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  return (
    <div className="stats-page">
      {/* Header */}
      <div className="stats-header">
        <div className="stats-header-inner">
          <Link to="/map" className="stats-back-btn">
            <i className="fas fa-arrow-left"></i> {t('stats.backToMap')}
          </Link>
          <h1 className="stats-title">
            <i className="fas fa-chart-bar"></i> {t('stats.pageTitle')}
          </h1>
          <p className="stats-subtitle">{t('stats.pageSubtitle')}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="stats-controls">
        {/* Country filter */}
        <div className="stats-control-group">
          <label className="stats-control-label">
            <i className="fas fa-globe-americas"></i> {t('stats.filterByCountry')}
          </label>
          <select
            className="stats-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="all">{t('stats.allCountries')}</option>
            {countriesList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="stats-control-group">
          <label className="stats-control-label">
            <i className="fas fa-sort"></i> {t('stats.sortBy')}
          </label>
          <div className="stats-sort-btns">
            {(
              [
                { key: 'pcFemale', label: t('stats.sort.pcFemale') },
                { key: 'pcLink', label: t('stats.sort.pcLink') },
                { key: 'totalNames', label: t('stats.sort.totalNames') },
                { key: 'name', label: t('stats.sort.name') },
              ] as { key: SortKey; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                className={`stats-sort-btn ${sortKey === key ? 'active' : ''}`}
                onClick={() => handleSort(key)}
              >
                {label}
                {sortKey === key && (
                  <i
                    className={`fas fa-chevron-${sortDir === 'asc' ? 'up' : 'down'}`}
                  ></i>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* View toggle */}
        <div className="stats-control-group">
          <label className="stats-control-label">
            <i className="fas fa-eye"></i> {t('stats.view')}
          </label>
          <div className="stats-view-toggle">
            <button
              className={`stats-view-btn ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              <i className="fas fa-chart-bar"></i> {t('stats.viewCharts')}
            </button>
            <button
              className={`stats-view-btn ${activeView === 'table' ? 'active' : ''}`}
              onClick={() => setActiveView('table')}
            >
              <i className="fas fa-table"></i> {t('stats.viewTable')}
            </button>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="stats-summary-bar">
        <div className="stats-summary-item">
          <span className="stats-summary-number">{filteredCities.length}</span>
          <span className="stats-summary-label">{t('stats.summary.cities')}</span>
        </div>
        <div className="stats-summary-item">
          <span className="stats-summary-number">
            {filteredCities
              .reduce((acc, c) => acc + c.datos.totalNames, 0)
              .toLocaleString()}
          </span>
          <span className="stats-summary-label">{t('stats.summary.totalStreets')}</span>
        </div>
        <div className="stats-summary-item">
          <span className="stats-summary-number stats-summary-female">
            {filteredCities
              .reduce((acc, c) => acc + c.datos.numFemale, 0)
              .toLocaleString()}
          </span>
          <span className="stats-summary-label">{t('stats.summary.femaleStreets')}</span>
        </div>
        <div className="stats-summary-item">
          <span className="stats-summary-number stats-summary-wiki">
            {filteredCities
              .reduce((acc, c) => acc + c.datos.numLink, 0)
              .toLocaleString()}
          </span>
          <span className="stats-summary-label">{t('stats.summary.wikiStreets')}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="stats-content">
        {activeView === 'overview' ? (
          <>
            {/* Comparison charts */}
            <section className="stats-section">
              <h2 className="stats-section-title">
                <i className="fas fa-venus"></i> {t('stats.femalePercentageTitle')}
              </h2>
              <ComparisonChart
                cities={filteredCities}
                metric="pcFemale"
                color="var(--female-color)"
                labelKey="chart.women"
              />
            </section>

            <section className="stats-section">
              <h2 className="stats-section-title">
                <i className="fab fa-wikipedia-w"></i> {t('stats.wikiCoverageTitle')}
              </h2>
              <ComparisonChart
                cities={filteredCities}
                metric="pcLink"
                color="var(--male-color)"
                labelKey="chart.have"
              />
            </section>

            {/* City cards grid */}
            <section className="stats-section">
              <h2 className="stats-section-title">
                <i className="fas fa-city"></i> {t('stats.cityCardsTitle')}
              </h2>
              <div className="stats-cards-grid">
                {filteredCities.map((city) => (
                  <CityStatsCard key={city.id} city={city} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="stats-section">
            <StatsTable
              cities={filteredCities}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </section>
        )}
      </div>
    </div>
  );
};
