module.exports = {
  "parser": "babel-eslint",
  "env": {
    "node": true,
//    "es6": true,
    "browser": true,
    "jest": true
  },
  "rules": {
    "no-console": 0,
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight", "to" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }]
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