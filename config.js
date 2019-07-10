const fs = require('fs');
const defaultConfig = require('./config-default');
const overrideConfig = require('./config-override');
const testConfig = require('./config-test');

let config = null;

if (process.env.NODE_ENV === 'test') {
  console.log(`Load测试环境配置文件 ${testConfig}...`);
  config = testConfig;
} else {
  console.log(`Load生产环境配置文件 ${defaultConfig}...`);
  config = defaultConfig;
  try {
    if (fs.statSync(overrideConfig).isFile()) {
      console.log(`Load ${overrideConfig}...`);
      config = Object.assign(config, overrideConfig);
    }

  } catch (err) {
    console.log(`Cannot load ${overrideConfig}.`);
  }
}

module.exports = config;
