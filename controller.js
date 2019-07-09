const fs = require('fs');
const path = require('path');

function addController(router, dir) {
  const files = fs.readdirSync(path.join(__dirname, dir));

  const jsFiles = files.filter((f) => {
    return f.endsWith('.js');
  });

  for (let f of jsFiles) {
    console.log(`正在处理controller: ${f}...`);

    let mapping = require(path.join(__dirname, dir, f));

    addMapping(router, mapping);
  }
}

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`注册了url mapping: GET ${path}`);
    } else if (url.startsWith('POST')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`注册了url mapping: POST ${path}`);
    } else {
      console.log(`invaild URL: ${url}`);
    }
  }
}

module.exports = function (dir) {
  let controllerDir = dir || 'controllers';
  let router = require('koa-router')();
  addController(router, controllerDir);
  return router.routes();
}
