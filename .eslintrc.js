module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ["plugin:vue/vue3-strongly-recommended", "@vue/airbnb", "prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vuejs-accessibility/form-control-has-label": "off",
    "linebreak-style": 0,
    "vuejs-accessibility/label-has-for": "off",
    "vue/script-setup-uses-vars": "error",
    "@typescript-eslint/ban-ts-comment": "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    "prettier-vue": {
      SFCBlocks: {
        template: false,
      },
    },
  },
};
