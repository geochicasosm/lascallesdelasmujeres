/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_TOKEN: string;
  readonly VITE_GA_UID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
