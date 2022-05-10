module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/*.spec.js"],
  moduleNameMapper: {
    "\\.(css|jpg|png)$": "<rootDir>/tests/empty-module.js",
  },
};
