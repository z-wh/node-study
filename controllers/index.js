const index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
                        <form action="/signin" method="post">
                            <p>Name: <input name="name" value="koa"></p>
                            <p>Password: <input name="password" type="password"></p>
                            <p><input type="submit" value="Submit"></p>
                        </form>`;
};

const signin = async (ctx, next) => {
  const name = ctx.request.body.name || '';
  const password = ctx.request.body.password || '';

  console.log(`sign in with name: ${name}, password: ${password}`);

  if (name === 'koa' && password === '123') {
    ctx.response.body = `<h1>hello, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>sorry! login failed!</h1>
                             <p><a href='/'>please try again!!!</a></P>`;
  }
};

module.exports = {
  'GET /': index,
  'POST /signin': signin,
};
