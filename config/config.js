﻿module.exports = {
  db: {
    name: 'blogapi',
    connString: 'mongodb://localhost/blogapi',
  },
  setupImportFilesDir: './setup/import/importFiles',
  server: {
    port: 3000,
  },
  log: {
    filepath: './blogapi-logfile.log',
  },
  test: {
    db: {
      name: 'blogapi-test',
      connString: 'mongodb://localhost/blogapi-test',
    },
  }
};