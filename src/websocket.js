import dotenv from 'dotenv';
dotenv.config();
import { loadConfig } from './config/config.js';

import express from 'express';

import serverHttp from 'http';

import socket from 'socket.io';
import { JWT_verifyProfile } from './routes/JWT/JWTHelper.js';
import Sequelize from 'sequelize';
import { MODELS, startConnection } from './sequelize.js';
import moment from 'moment';
import { getJson } from './helper/axio.js';
import { preparePrintObj } from './helper/stallPrintHelper.js';
const Op = Sequelize.Op;
const connectedSocket = {};
const init = async () => {
  console.log(`process.env.NODE_ENV?`, process.env.NODE_ENV);
  const envConfig = loadConfig(process.env.NODE_ENV);
  startConnection();
  const app = express();

  const server = serverHttp.createServer(app);
  // app.use(admin_access_api);
  const io = socket(server);

  const connectedProfile = {};
  let stallIds = [];
  let stallIdObjs = [];
  let stallIdsLoadAt;
  const loadStallIds = async () => {
    const { Stall } = MODELS;
    stallIds = [];
    const s = await Stall.findAll({ where: { enableKitchenPrint: true } });
    stallIdObjs = await Promise.all(
      s.map((s) => {
        return { id: s.id, telegramId: s.telegramId, name: s.name, otherFeatures: s.otherFeatures };
      })
    );
    stallIds = await Promise.all(s.map((s) => s.id));
    console.log(`kitchen stall ids?`, stallIds);
  };

  await loadStallIds();
  io.on('connection', (socket) => {
    console.log(`???`);
    //ASKING TO REPORT IN
    // io.emit('report_in');

    //DISCONNECT
    socket.on('disconnect', function () {
      delete connectedProfile[socket.profileKey];
    });

    //REQUEST TO CONNECT
    socket.on('request_connection', ({ jwt }) => {
      console.log(`someone requesting in`, socket.id);
      if (!jwt) socket.disconnect();
      const claims = JWT_verifyProfile(jwt.startsWith(`Bearer`) ? jwt.substr(7, jwt.length) : jwt);

      if (claims) {
        console.log(`emitting connected`);
        io.emit('connected');
      } else {
        socket.disconnect();
      }
    });
    socket.on('register_pos', async ({ posId, stallId }) => {
      console.log(`in regsiter pos`);
      if (!stallIdsLoadAt || moment().add(-10, 'minutes').isAfter(stallIdsLoadAt)) {
        console.log(`reloading stallids`, stallIds);
        await loadStallIds();
        console.log(`reloaded stallids`, stallIds);
      }
      console.log(`REGISTERING POS!!!!`, posId, stallId);
      // if (stallIds.includes([39, 71, 46])) {
      // }
      // if (stallId === 39 || stallId === 71 || stallId === 46) {
      if (stallIds.includes(stallId)) {
        console.log(`REGISTERING POS ACCEPTED!!!!`, posId, stallId);
      } else {
        console.log(`invalid sent to disconnect`, stallId, stallIds);
        socket.disconnect();
      }
      // console.log(`socket.?`, socket);
      let sockets = [];

      if (connectedSocket[`${stallId}`]) {
        sockets = connectedSocket[`${stallId}`].sockets;
      } else {
        connectedSocket[`${stallId}`] = {};
      }

      if (!sockets.find((s) => s.id === socket.id)) sockets.push(socket);

      console.log(`this socket?`, socket.id);
      // connectedSocket[`${stallId}`].sockets = sockets;
      const newSockets = [];
      for (const s of sockets) {
        if (!s.connected) console.log(`s.connected  false?`, s.connected, s.id);
        else newSockets.push(s);
      }
      connectedSocket[`${stallId}`].sockets = newSockets;
      console.log(`sockets?`, connectedSocket[`${stallId}`].sockets.length);
    });
  });
  // const sendBroadCast = (socket, pushData) => {
  //   io.emit(`printKitchenOrder`, pushData);
  // };

  setTimeout(async () => {
    loadStallsWithKitchen();
    loadStallsWithCallForBill();
  }, 3000);
  const stallsWKitchen = [];
  const loadStallsWithKitchen = async () => {
    const { StallPosPrintConfig, StallPos, Stall } = MODELS;
    try {
      const list = await StallPosPrintConfig.findAll({
        where: {
          kitchenPrint: true,
        },
        include: { model: StallPos, include: { model: Stall, where: { enableKitchenPrint: true } } },
      });
      console.log(`loadStallsWithKitchen??`, list.length);
      for (const l of list) {
        if (l.stallPo) if (!stallsWKitchen.find((s) => s === l.stallPo.stallId)) stallsWKitchen.push(l.stallPo.stallId);
      }
      callPrintKitchen();
    } catch (err) {
      console.log(`loadStallsWithKitchen err?`, err);
    }
    delay(10000);
  };
  const stallsWithCallForBill = [];
  const loadStallsWithCallForBill = async () => {
    const { StallPosPrintConfig, StallPos } = MODELS;
    try {
      const list = await StallPosPrintConfig.findAll({
        where: {
          callForBillPrint: true,
        },
        include: StallPos,
      });
      console.log(`loadStallsWithCallForBill??`, list.length);
      for (const l of list) {
        if (!stallsWithCallForBill.find((s) => s === l.stallPo.stallId)) stallsWithCallForBill.push(l.stallPo.stallId);
      }
      callCallForBill();
    } catch (err) {
      console.log(`loadStallsWithKitchen err?`, err);
    }
  };

  // setTimeout(async () => {
  //   callCallForBill();
  // }, 6000);
  const callCallForBill = async () => {
    console.log(`BILL check call for bill Start query`);
    const { OrderPending } = MODELS;
    try {
      const list = await OrderPending.findAll({
        where: {
          callForBill: true,
          callForBillPrint: false,
          stallId: stallsWithCallForBill,
          createdAt: { [Op.gt]: moment().add(-6, 'hours') },
        },
        limit: 10,
        order: [['id', 'DESC']],
      });
      console.log(`BILL call for bill len:`, list.length);
      for (const l of list) {
        await emittingCallForBill(l);
      }
    } catch (err) {
      console.log(`BILL callCallForBill erro?`, err);
    }
    await delay(5000);
    console.log(`callCallForBill DONE`);
    callCallForBill();
  };
  // setInterval(() => {
  //   console.log(`ping again`);
  //   const sockets = io.sockets.sockets;
  //   for (const socketId in sockets) {
  //     // console.log(`socketId?`, socketId);
  //     const sc = sockets[socketId];
  //     sc.emit(`pingAgain`);
  //   }
  // }, 60000);

  const attemptPrintKitchen = {};
  const attemptPrintKitchenReattempt = {};

  const callPrintKitchen = async () => {
    console.log(`KITCHEN send order pending to kitchen START`);
    const { OrderPending, OrderPendingItemPrint } = MODELS;
    try {
      const ignoreStallsId = [];
      for (const [key, value] of Object.entries(attemptPrintKitchenReattempt)) {
        value.counter = value.counter + 1;
        if (value.counter < 3) {
          const thisSI = key.substring(1, key.length);
          ignoreStallsId.push(Number(thisSI));
        } else if (value.counter > 4) {
          delete attemptPrintKitchenReattempt[key];
        }
      }
      const considerStallId = [];
      for (const sid of stallsWKitchen) {
        // console.log(`ignoreStallsId?`, ignoreStallsId, sid);
        if (!ignoreStallsId.includes(sid)) considerStallId.push(sid);
      }
      console.log(`ignoreStallsId??`, ignoreStallsId);
      console.log(`send order pending to kitchen QUERY ON STALLS`, considerStallId);
      if (considerStallId.length === 0) {
        console.log(`KITCHEN send order pending to kitchen NO STALL TO QUERY`);
        await delay(5000);
        console.log(`callPrintKitchen DONE`);
        callPrintKitchen();
        return;
      }
      const list1 = await OrderPendingItemPrint.findAll({
        where: {
          printed: null,
          stallId: considerStallId,
          createdAt: { [Op.gt]: moment().add(-6, 'hours') },
        },
        order: [['id', 'DESC']],
        raw: true,
      });

      console.log(`list1 size?`, list1.length);

      const fullList = [];
      for (const item of list1) {
        if (moment(item.createdAt).isBefore(moment().add(-5, 'minutes'))) {
          notify(item);
        }
        const stallIdObj = stallIdObjs.find((sio) => sio.id === item.stallId);
        const { otherFeatures } = stallIdObj;
        const { masterInfo } = item;
        if (masterInfo.orderVia === `pos`) {
          const add1Min = moment(item.createdAt).add(30, 'seconds');
          if (add1Min.isBefore(moment())) {
            preparePrintObj(fullList, item, otherFeatures);
          }
        } else {
          preparePrintObj(fullList, item, otherFeatures);
        }

        // const { masterInfo } = item;
        // if (item.purpose === 'tableChange') {
        //   const orderPending = {
        //     purpose: item.purpose,
        //     id: item.id,
        //     orderPendingId: item.orderPendingId,
        //     stallId: item.stallId,
        //     createdAt: masterInfo.createdAt,
        //     items: item.items,
        //     name: item.name,
        //     srcTableName: masterInfo.srcTableName,
        //     descTableName: masterInfo.descTableName,
        //     mainItemSpecialRemark: masterInfo.mainItemSpecialRemark,
        //   };
        //   fullList.push(orderPending);
        // } else {
        //   let orderPending = fullList.find((f) => f.id === item.orderPendingId);
        //   if (!orderPending) {
        //     orderPending = {
        //       id: item.orderPendingId,
        //       stallId: item.stallId,
        //       createdAt: masterInfo.createdAt,
        //       takeAway: masterInfo.takeAway,
        //       items: [],
        //       tableName: masterInfo.tableName,
        //       pax: masterInfo.pax,
        //     };
        //     fullList.push(orderPending);
        //   }
        //   orderPending.items.push(item);
        // }
      }

      // return;
      // console.log(`list`, list);
      for (const l of fullList) {
        // sendBroadCastRaw(`newOrderPending`, { data: { l } });
        await emittingOrderPending(l);
        // l.update({ sendToPrint: true });
      }
      console.log(`send order pending to kitchen (4)`);

      const total = io.engine.clientsCount;
      // const sockets = io.sockets.sockets;
      // for (const socketId in sockets) {
      //   const sc = sockets[socketId];
      //   console.log(`detected socket id`, sc.id, sc.connected);
      // }
      console.log(`io total clients?`, total);
    } catch (err) {
      console.log(`callPrintKitchen erro?`, err);
    }
    await delay(5000);
    console.log(`callPrintKitchen DONE`);
    callPrintKitchen();
    // SEND ORDER PENDING TO POS
  };
  const emittingOrderPending = async (orderPending) => {
    console.log(`attempt to send ORDER to stall kitchen`, orderPending.stallId);
    const sockets = io.sockets.sockets;
    // console.log(`connectedSocket?`, connectedSocket);
    const cs = connectedSocket[`${orderPending.stallId}`];
    if (!cs) {
      // console.log(`no socket detected for `, orderPending.stallId);
      manageAttemptPrintKitchen(orderPending);
      return;
    }
    for (const socketId in sockets) {
      // console.log(`socketId?`, socketId);

      const { sockets } = cs;
      for (const css of sockets) {
        // console.log(`css ID??`, css.id, css.connected);
        if (css.connected && css.id === socketId) {
          console.log(`found!!!`, css.connected, orderPending.id);
          await css.emit(`newOrderPending`, { data: { orderPending } });

          // orderPending.update({ sendToPrint: true });
        }
      }
    }
  };

  const manageAttemptPrintKitchen = (orderPending) => {
    console.log(`manageAttemptPrintKitchen start`, orderPending.id);

    if (!attemptPrintKitchen[`o${orderPending.id}`]) attemptPrintKitchen[`o${orderPending.id}`] = { counter: 0 };
    attemptPrintKitchen[`o${orderPending.id}`].counter = attemptPrintKitchen[`o${orderPending.id}`].counter + 1;

    console.log(`manageAttemptPrintKitchen counting`, attemptPrintKitchen[`o${orderPending.id}`].counter);

    if (attemptPrintKitchen[`o${orderPending.id}`].counter > 2) {
      attemptPrintKitchenReattempt[`s${orderPending.stallId}`] = { counter: 0 };
      delete attemptPrintKitchen[`o${orderPending.id}`];
      console.log(`manageAttemptPrintKitchen delete`, orderPending.id);
    }
  };
  const emittingCallForBill = async (orderPending) => {
    console.log(`BILL attempt to send BILL to stall`, orderPending.stallId);

    const sockets = io.sockets.sockets;
    for (const socketId in sockets) {
      const cs = connectedSocket[`${orderPending.stallId}`];
      if (!cs) return;
      const { sockets } = cs;
      for (const css of sockets) {
        if (css.connected && css.id === socketId) {
          console.log(`found Call for bill!!!`, css.connected);
          await css.emit(`emittingCallForBill`, { data: { orderPending } });
          await orderPending.update({ callForBillPrint: true });
        }
      }
    }
  };

  const notifyLog = {};
  const notify = async (item) => {
    if (item.stallId === 38) return;
    if (notifyLog[`i${item.id}`]) {
      const { notifyItem, lastUpdate, count } = notifyLog[`i${item.id}`];
      if (lastUpdate.isBefore(moment().add(-1, 'minutes'))) {
        // after 1 min
        notifyLog[`i${item.id}`].lastUpdate = moment();
        notifyLog[`i${item.id}`].count = count + 1;
      } else {
        // within one min
        return;
      }
    } else {
      notifyLog[`i${item.id}`] = { notifyItem: item, lastUpdate: moment(), count: 1 };
    }
    const { teleSupportbot } = envConfig;
    const { secretKey, chat_id } = teleSupportbot;

    const minutesDiff = moment().diff(moment(item.createdAt), 'minutes');

    const stallIdObj = stallIdObjs.find((sio) => sio.id === item.stallId);
    const sendTelegramId = (stallIdObj && stallIdObj.telegramId) || chat_id;
    const stallName = (stallIdObj && stallIdObj.name) || `default telegrame id`;

    let text = `Print ID: ${item.id}, created at: ${moment(item.createdAt).format('HH:mm')} (${minutesDiff}min) Has Not PRINT [${
      notifyLog[`i${item.id}`].count
    }]`;
    text += `\nItem: ${item.name}`;
    text += `\nStall ID: ${item.stallId}`;
    text += `\nStall: ${stallName}`;

    // let chat_id = `-833255768`; // channel
    // chat_id=`945934775`; // leo pm

    console.log(`sendTelegramId??`, item.stallId, stallIdObj, sendTelegramId);
    const url = `https://api.telegram.org/bot${secretKey}/sendMessage?chat_id=${sendTelegramId}&text=${text}`;
    const encodedUrl = encodeURI(url);
    try {
      await getJson(encodedUrl);
    } catch (err) {
      console.log(`Telegram error`, err.message);
    }
  };
  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  const usePort = process.env.USE_PORT || `NOTIFICATION_SOCKET_PORT`;
  const portNo = process.env[`${usePort}`];
  server.listen(portNo, () => {
    console.log(`ADMIN START:: Listening on NOTIFICATION_SOCKET_PORT ${portNo}!`);
    console.log(`ADMIN START:: ENV MODE ${JSON.stringify(process.env.NODE_ENV)}!`);
    //load config
  });
};
init();
