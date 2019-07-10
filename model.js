const fs = require('fs');
const path = require('path');
const db = require('./db');

const files = fs.readdirSync(path.join(__dirname, 'models'));

const jsFile = files.filter((f) => {
  return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of jsFile) {
  console.log(`load ${f}....`);
  let name = f.substring(0, f.length - 3);
  module.exports[name] = require(path.join(__dirname, 'models', name));
}

module.exports.sync = () => {
  db.sync();
};
