module.exports = {
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  extends: ["plugin:react/recommended", "plugin:jest/recommended", "plugin:prettier/recommended"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "react/prop-types": ["off"],
    "react/react-in-jsx-scope": "off",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
}
