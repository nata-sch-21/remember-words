module.exports = {
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "es6": true,
    "browser": true,
    "jest": true
  },
  "rules": {
    "no-console": 0,
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "react/jsx-filename-extension": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight", "to" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
  },
  "globals": {
    "shallow": true,
    "render": true,
    "mount": true,
    "deepFreeze": true,
  },
  "extends": [
    "airbnb"
  ]
};