const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
});

// pet默认关联表 pets  ？  还需要查api文档理解下
const Pet = sequelize.define(
  'pet',
  {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT,
  },
  {
    timestamps: false,
  },
);

const now = Date.now();
console.log(now);

(async () => {
  const dog = await Pet.create({
    id: 'd-' + now,
    name: 'ommi',
    gender: false,
    birth: '2018-9-23',
    createdAt: now,
    updatedAt: now,
    version: 0,
  });
  console.log('created:' + JSON.stringify(dog));
})();

(async () => {
  const pet = await Pet.findAll({
    where: {
      name: 'xiaohuang',
    },
  });

  console.log(`查找到${pet.length}个宠物信息`);

  for (let p of pet) {
    console.log(JSON.stringify(p));
    p.name = 'xiaohuang';
    p.gender = true;
    p.updatedAt = Date.now();
    p.version++;
    await p.save();

    if (p.version === 3) {
      await p.destroy();
      console.log(`${p.name} was destroyed.`);
    }
  }
})();
