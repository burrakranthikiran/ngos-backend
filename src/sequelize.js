import Sequelize from "sequelize";

import { envConfig } from "./config/config.js";

import LoginTableModel from "./models/LoginTable.js";
import EventPostTableModel from "./models/EventPostTable.js";
import NotificationTableModel from "./models/NotificationTable.js";








export let sequelize;
export const MODELS = {};
export const startConnection = async () => {
  const db = envConfig.db;
  console.log(`sequelize db??`, db);
  sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    port: db.port,
    dialect: "mysql",
    pool: {
      max: 5000,
      port: db.port,
      min: 0,
      acquire: 30000,
      idle: 10000,
      charset: "utf8mb4",
    },
  
    timezone: "+05:30", 
    logging: false,
  });

  const mandatory = {
    foreignKey: {
   
    },
  };
  MODELS.LoginTable = LoginTableModel(sequelize, Sequelize);
  MODELS.EventPostTable = EventPostTableModel(sequelize, Sequelize);
  MODELS.NotificationTable = NotificationTableModel(sequelize, Sequelize);
  
  MODELS.NotificationTable.belongsTo(MODELS.EventPostTable);
  MODELS.EventPostTable.hasMany(MODELS.NotificationTable);
  MODELS.NotificationTable.belongsTo(MODELS.LoginTable);
  MODELS.LoginTable.hasMany(MODELS.NotificationTable);
 

  if (db.syncForce || db.syncAlter) await syncDB();
  if (db.seekAccount) await syncSeekAccount();
};
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const syncSeekAccount = async () => {
  console.log(`syncSeekAccount - triggering`);
  const db = envConfig.db;
  const seek = db.seek;
  console.log(`syncSeekAccount - Done`);
  return;
};
export const syncDB = async () => {
  const db = envConfig.db;
  const { mode } = envConfig;
  console.log(`syncDB??`, db, mode);
  // if (mode === `production` && db.syncForce)
  //   throw Error(`Production Server Cannot Run SyncForce to true`);
  // if (db.host !== `localhost` && db.syncForce)
  //   throw Error(`Only Localhost Can Run SyncForce to true`);
  try {
    const ok = await sequelize.sync({
      force: db.syncForce,
      alter: db.syncAlter,
    });
    if (ok)
      console.log(`Database & tables synced!`, db.syncForce, db.syncAlter);
  } catch (err) {
    console.log(`sync db err`, err);
  }
};
let connectionReleased = 0;
export const getNewConnection = async () => {
  if (connectionReleased < 50) {
    connectionReleased++;
    return await sequelize.transaction();
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return getNewConnection();
};
setInterval(() => {
  if (connectionReleased > 0) {
    connectionReleased--;
  }
}, 10000);
export const releaseConnection = () => {
  connectionReleased--;
};
