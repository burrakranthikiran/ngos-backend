import express from 'express';

import { cmnotificationmanager } from '../../entityManagers/company/cmnotification.js';


export const company_notification_api = express.Router();
const ns = `/notification`;
 /* Final Code Functions*/
 company_notification_api.post(`${ns}/create`, async function (req, res) {
    try {
      const paramsObject = req.body;
     
      const objectdata = await cmnotificationmanager.create(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_notification_api.get(`${ns}/view`, async function (req, res) {
    try {
      const objectdata = await cmnotificationmanager.list();
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  