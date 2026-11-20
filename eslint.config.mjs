import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import fsd from "./config/eslint/fsd.mjs";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["dist/**", "node_modules/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh, fsd },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["TitleType", "TitleColorType", "ButtonType", "CounterType", "CounterNameType"],
        },
      ],
      "fsd/imports": "error",
    },
  },
  { files: ["*.{mjs,ts}", "config/**/*.mjs"], languageOptions: { globals: globals.node } },
  prettier,
]);
