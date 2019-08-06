# remember-words

#### Versions

* 1.0.0

Linter `eslint`, standart `airbnb`

**client**

nodejs v8.9.3

React-redux application
 1) react, redux, react-redux (react-router, reselect, recompose, redux-promise, redux-actions)
 2) webpack
 3) sass
 4) Unit tests (`jest` - test framework, `enzyme` - assertion and mocking library)

**api**
 1) NoSQL database `nedb-promise`
 2) REST
 
 
 **How to parse dictionaries into DB?**
 1. Create folder `api/parse/new` and copy json files from `dictionaries` into it
 2. Go to `api` and run `npm run db:parse`

**Run app**
 
```
cd ./api
yarn start

cd ./client
yarn start

```
