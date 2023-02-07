module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "no-console": "off",
    "class-methods-use-this": "off",
    "import/first": "off"
  },
};
