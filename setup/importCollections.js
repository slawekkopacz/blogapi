﻿var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var importDir = './setup/mongoImportFiles';

fs.readdir(importDir, function (err, files) {
  if (err) {
    return console.error(err);
  }

  files.forEach((fileName) => {
    mongoImport(importDir, fileName);
  });
});

function mongoImport(importDir, fileName) {
  var filePath = importDir + '/' + fileName;
  var collectionName = path.basename(fileName, path.extname(fileName));

  exec(`mongoimport --db blogapi --collection ${collectionName} --drop --file ${filePath}`,
    (err, stdout, stderr) => {
      if (err) {
        return console.error(`exec error: ${err}`);
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
}