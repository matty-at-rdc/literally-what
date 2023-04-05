module.exports = {
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser", // Important bit!
  rules: {
    "no-undef": "off",
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
  },
}
