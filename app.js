const WebScoket = require('ws');
// 引用ws的Server类
const WebScoketServer = WebScoket.Server;

// 实例化
const wss = new WebScoketServer({
  port: 3000,
});

wss.on('connection', function (ws) {
  console.log('[SERVER] connection()');
  ws.on('message', function (message) {
    console.log(`[SERVER] recived ${message}`);
    ws.send(`ECHO: ${message}`, (err) => {
      if (err) {
        console.log(`[SERVER] error: ${err}`);
      }
    });
  })
});

const ws = new WebScoket('ws://127.0.0.1:3000/test');
ws.on('open', function () {
  console.log('[CLIENT] open!');
  ws.send('hello');
});

ws.on('message', function (message) {
  console.log(`[CLIENT] recived ${message}`);
});
