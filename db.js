const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('./config');

console.log('init sequelize...');

function generateId() {
  return uuid.v4();
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  const attrs = {};

  for (let key in attributes) {
    let value = attributes[key];
    // 如果attributes是个对象，并且有type属性
    if (typeof value === 'object' && value['type']) {
      // 所有字段默认为非空，除非显示指定了null值则用传进来的，否则赋值false
      value.allowNull = value.allowNull || false;
      // 把取到的key-value对放进新的attrs对象
      attrs[key] = value;
    } else {
      /**  如果不是对像只是个key-value，如：password: db.STRING(100) ->
       attrs = { password: {
          type: STRING(100),
          allowNull: false,
       } } */
      attrs[key] = {
        type: value,
        allowNull: false,
      }
    }
  }

  // 添加默认都有的字段 id  createdAt updatedAt version
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true,
  };
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };

  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false, // 不要sequelize自动生成createdAt updatedAt
    /**
     * Sequelize在创建、修改Entity时会调用我们指定的函数，
     * 这些函数通过hooks在定义Model时设定。
     * 我们在beforeValidate这个事件中根据是否是isNewRecord
     * 设置主键（如果主键为null或undefined）、设置时间戳和版本号。
     */
    hooks: {
      beforeValidate(obj) {
        const now = Date.now();
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          obj.updatedAt = Date.now();
          obj.version++;
        }
      },
    },
  });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

const exp = {
  defineModel,
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({ force: true });
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
