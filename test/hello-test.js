const assert = require('assert');
const fs = require('fs');
const hello = require('../hello');

describe("#async", () => {
  describe('#async()', () => {
    // 如果要测试异步函数，我们要传入的函数需要带一个参数，通常命名为done
    // 测试异步函数需要在函数内部手动调用done()表示测试成功，done(err)表示测试出错。
    it('test async function', function (done) {
      fs.readFile('data.txt', function (err, data) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });

    // 对于用ES7的async编写的函数，我们可以这么写
    it('#async with done', (done) => {
      (async function () {
        try {
          let r = await hello();
          assert.strictEqual(r, 15);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    //但是用try...catch太麻烦。还有一种更简单的写法，就是直接把async函数当成同步函数来测试：
    it('#async function', async () => {
      let r = await hello();
      assert.strictEqual(r, 15);
    });
  });
});
