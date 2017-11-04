const config = require('../config');

const fs = require('fs');

const path = require('path');

const dir = path.resolve(config.db.path);

const migrations = require('./migrations');

// should try use async await

const migrateDB = () => {
  const migrationNames = Object.keys(config.db.files) || [];

  if (migrationNames.length === 0) {
    throw new Error('There is no migrations in config.js');
  }

  migrationNames.forEach((fileName) => {
    if (migrations[fileName]) {
      migrations[fileName]()
        .then(() => console.log(`- Migration ${fileName} - have been successfully migrated`))
        .catch(err => console.log(err));
    } else {
      console.log(`Migration ${fileName} haven't been created yet`);
    }
  });
};

if (!fs.existsSync(dir)) {
  try {
    fs.mkdirSync(dir);
  } catch (e) {
    console.log(e);
  }
} else {
  console.log('Data base have been already initialized');
}

migrateDB();
