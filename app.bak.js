const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

const app = new Koa();

app.use(bodyParser());

// log request url
app.use(async (ctx, next) => {
  console.log(`process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// use koa-router
router.get('/hello/:name', async (ctx, next) => {
  const name = ctx.params.name;
  ctx.response.body = `<h1>hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
                        <form action="/signin" method="post">
                            <p>Name: <input name="name" value="koa"></p>
                            <p>Password: <input name="password" type="password"></p>
                            <p><input type="submit" value="Submit"></p>
                        </form>`;
});

router.post('/signin', async (ctx, next) => {
  const name = ctx.request.body.name || '';
  const password = ctx.request.body.password || '';

  console.log(`sign in with name: ${name}, password: ${password}`);

  if (name === 'koa' && password === '123') {
    ctx.response.body = `<h1>hello, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>sorry! login failed!</h1>
                             <p><a href='/'>please try again!!!</a></P>`;
  }
})

// add router middleware
app.use(router.routes());

app.listen(3000);

console.log('app started at http://127.0.0.1:3000...');
