const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  const autoescape = opts.autoescape === undefined ? true : opts.autoescape;
  const noCache = opts.noCahe || false;
  const watch = opts.watch || false;
  const throwOnUndefined = opts.throwOnUndefined || false;

  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('views', {
      noCache,
      watch,
    }), {
      autoescape,
      throwOnUndefined,
    },
  );

  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }

  return env;
}

const env = createEnv('views', {
  watch: true,
  filters: {
    hex: function (n) {
      return '0x' + n.toString(16);
    },
  },
});

let s = env.render('hello.html', { name: '小明' });
console.log(s);

s = env.render('hello.html', { name: '<script>alert("小明")</script>' });
console.log(s);

s = env.render('extend.html', {
  header: 'hello',
  body: 'bala bala bala...',
});
console.log(s);
