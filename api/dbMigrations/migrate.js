const config = require('../config');

const fs = require('fs');

const migrations = require('./migrations');

const migrateDB = () => {
  const migrationNames = Object.keys(config.db.migrations) || [];

  if (migrationNames.length === 0) {
    throw new Error('There is no migrations in config.js');
  }

  // TODO use Promise.all instead
  migrationNames.forEach((fileName) => {
    if (migrations[fileName]) {
      try {
        migrations[fileName]();
        console.log(`- Migration ${fileName} - have been successfully migrated`);
      } catch (e) {
        console.log(`Error migrate: ${e}`);
      }
    } else {
      console.log(`- Migration ${fileName} - haven't been created yet`);
    }
  });
};

if (!fs.existsSync(config.db.path)) {
  try {
    fs.mkdirSync(config.db.path);
    migrateDB();
  } catch (e) {
    console.log(e);
  }
} else {
  console.log('Data base have been already initialized');
}
