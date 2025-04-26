import js from "@eslint/js";
import globals from "globals";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["src/**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["src/**/*.{js,mjs,cjs}"], languageOptions: { globals: 
    {
      "mapboxgl": "readonly",
    }
   } },
  { files: ["src/**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
