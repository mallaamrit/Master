module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/*.spec.js", "**/*.spec.jsx"],
  moduleNameMapper: {
    "\\.(css|jpg|png)$": "<rootDir>/tests/empty-module.js",
  },
};
