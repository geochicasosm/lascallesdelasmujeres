# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Las Calles de las Mujeres" (The Streets of Women) is a collaborative Geochicas project that maps streets named after women in Latin America and Spain. The application visualizes gender gaps in street naming and links to Wikipedia biographies. The project emphasizes remembering women's contributions through public and digital spaces.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Mapping**: Mapbox GL (via react-map-gl) - requires VITE_MAPBOX_TOKEN
- **Routing**: React Router v6
- **State Management**: Zustand (city selection state)
- **Internationalization**: i18next (supports es, en, ca, it)
- **Charts**: Chart.js + react-chartjs-2
- **Testing**: Vitest
- **Linting**: ESLint with TypeScript support

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

## Environment Setup

Create a `.env` file with:
```
VITE_MAPBOX_TOKEN=<your_mapbox_token>
VITE_GA_UID=<optional_google_analytics_id>
```

The Mapbox token is required for the map to function.

## Architecture

### Path Aliases

Configured in vite.config.ts and tsconfig.json:
- `@/` → `./src/`
- `@components/` → `./src/components/`
- `@hooks/` → `./src/hooks/`
- `@types/` → `./src/types/`
- `@stores/` → `./src/stores/`
- `@data/` → `./src/data/`
- `@utils/` → `./src/utils/`

### Component Structure

- **Layout**: AppLayout, Sidebar, MobileMenu
- **Map**: MapContainer, StreetLayer, CityMarker, MapPopup
- **Charts**: ChartPanel, GenderChart, WikipediaChart
- **Stats**: StatsPage, CityStatsCard, ComparisonChart, StatsTable
- **CityList**: CityList, CountryGroup, CityItem
- **UI**: LanguageSwitcher, Legend, ShareButton, LoadingSpinner

### State Management

- **Zustand Store** (`src/stores/cityStore.ts`): Manages selected city state
  - `selectedCity`: Currently selected city or null
  - `selectCity(city)`: Select a city
  - `clearCity()`: Clear selection

### Data Flow

1. **City Data**: Static city list with statistics in `src/data/cities.ts`
   - Organized by country → cities
   - Each city has: id, name, center coordinates, datos (statistics)
   - Statistics: numLink, pcLink, numNoLink, pcNoLink, numMale, numFemale, pcMale, pcFemale, totalNames

2. **GeoJSON Data**: Fetched dynamically via `useGeoJSON` hook
   - URL: `https://raw.githubusercontent.com/geochicasosm/lascallesdelasmujeres/master/data/{cityId}/final_tile.geojson`
   - Each feature has properties: name, gender ('Female' | 'Male'), wikipedia_link
   - Hook handles loading/error states

3. **Routing**:
   - `/` → redirects to `/map`
   - `/map` → main map view (all cities)
   - `/map/:cityId` → focused city view
   - `/stats` → statistics comparison page

### Key Hooks

- `useGeoJSON(cityId)`: Fetches and manages GeoJSON data for a city
- `useInitialCity()`: Initializes city selection from URL hash on mount
- `useKeyboardShortcuts()`: Enables keyboard navigation
- `useMap()`: Map interaction utilities
- `useMediaQuery()`: Responsive design queries

### Internationalization

- Translations in `src/data/i18n/{es,en,ca,it}.json`
- Auto-detects browser language, falls back to English
- Use `useTranslation()` hook from react-i18next

## Adding a New City

1. Add city data to `src/data/cities.ts` in the appropriate country's `citiesList`
2. Ensure GeoJSON file exists at `/data/{cityId}/final_tile.geojson` in the repository
3. City data structure:
   ```typescript
   {
     id: 'cityid',
     name: 'City Name',
     datos: {
       numLink: number,       // streets with Wikipedia links
       pcLink: number,        // percentage with links
       numNoLink: number,     // streets without Wikipedia links
       pcNoLink: number,      // percentage without links
       numMale: number,       // male-named streets
       numFemale: number,     // female-named streets
       pcMale: number,        // percentage male
       pcFemale: number,      // percentage female
       totalNames: number     // total named streets
     },
     center: [lng, lat]       // map center coordinates
   }
   ```

## Deployment

The project uses GitHub Actions for automated deployment to GitHub Pages:
- Triggers on push to `master` branch or manual workflow dispatch
- Builds with Node version specified in `.nvmrc`
- Creates `.env` from GitHub secrets (MAPBOX_TOKEN, GA_UID)
- Deploys `dist/` folder to GitHub Pages

## Mapbox Integration

- Map style: `mapbox://styles/mapbox/dark-v11`
- Initial view: centered on Atlantic Ocean showing Latin America/Europe
- Street layers colored by gender: Female (#FFCA3A yellow), Male (#00B99E teal)
- Click streets to see popup with name, gender, and Wikipedia link

## Important Constants

- `URL_DATA`: GitHub raw content base URL for GeoJSON files
- `COLORS.female`: #FFCA3A (yellow)
- `COLORS.male`: #00B99E (teal)
- `COLORS.primary`: #19535F
- `COLORS.secondary`: #0e9686
