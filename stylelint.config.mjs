/** @type {import('stylelint').Config} */
const config = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order"],
  ignoreFiles: ["node_modules/**", "dist/**", "build/**", "coverage/**"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
      { message: "Use BEM: block__element--modifier, with kebab-case names." },
    ],
    // Nested component states and responsive overrides intentionally share selectors.
    "no-descending-specificity": null,
  },
};

export default config;
