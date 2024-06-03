module.exports = {
  extends: [require.resolve("@gw/eslint-config-gw")],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  globals: {
    MOCK: true,
    CASE: true,
  },
};
