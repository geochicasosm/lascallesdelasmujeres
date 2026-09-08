# Las Calles de las Mujeres - Deployment Guide

## Production Build

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Mapbox API token configured in `.env`

### Build Process

1. **Install dependencies:**

```bash
npm install
```

2. **Set environment variables:**
   Create a `.env` file with:

```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

3. **Build for production:**

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory.

4. **Preview production build locally:**

```bash
npm run preview
```

### Deployment Options

#### GitHub Pages

1. Update `vite.config.ts` with your repository base:

```typescript
export default defineConfig({
  base: '/lascallesdelasmujeres/',
  // ... rest of config
})
```

2. Build and deploy:

```bash
npm run build
# Deploy dist folder to gh-pages branch
```

#### Netlify

1. Connect your repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: Add `VITE_MAPBOX_TOKEN`

#### Vercel

1. Connect your repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Add environment variables in Vercel dashboard

### Performance Optimization

#### Bundle Size

- Current bundle size: ~500KB (gzipped)
- Mapbox GL: ~200KB
- Chart.js: ~80KB
- React + dependencies: ~150KB

#### Optimization Strategies

✅ Code splitting with React.lazy (if needed)
✅ Tree shaking enabled (Vite default)
✅ Minification enabled in production
✅ CSS optimization
✅ Image optimization

### Environment Variables

Required:

- `VITE_MAPBOX_TOKEN` - Mapbox API token for map rendering

### Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

### Production Checklist

- [x] Error boundary implemented
- [x] Loading states for async operations
- [x] Mobile responsive design
- [x] Accessibility features (ARIA labels, keyboard navigation)
- [x] SEO meta tags
- [x] Analytics integration ready (GA4)
- [x] TypeScript compilation with no errors
- [x] ESLint checks passing

### Monitoring

After deployment, monitor:

- Load times (target: < 3s)
- Bundle size
- Error rates in browser console
- User interactions (with analytics)

### Troubleshooting

**Map not loading:**

- Check Mapbox token is correctly set
- Verify token has proper scopes
- Check browser console for errors

**Build fails:**

- Clear node_modules and reinstall
- Check Node.js version (18+ required)
- Verify all dependencies are installed

**Styles not applying:**

- Check CSS import order
- Verify Tailwind/CSS configuration
- Clear browser cache

### Support

For issues or questions:

- GitHub Issues: https://github.com/geochicasosm/lascallesdelasmujeres/issues
- Twitter: @GeochicasOSM
- Website: http://geochicas.org/
