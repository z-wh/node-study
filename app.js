const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();

app.use(bodyParser());
app.use(controller());

app.listen(3000);

console.log('server is running at http://127.0.0.1:3000.....');
