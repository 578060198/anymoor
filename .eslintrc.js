module.exports = {
  "extends": "eslint:recommended",
  "env": {
    // "browser": true,
    // "commonjs": true,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "globals": {
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "no-console": ["error", {
      "allow": ["warn", "error", "info"]
    }]
  }
};
