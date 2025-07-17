import express from 'express';
import { cmloginmanager } from '../../entityManagers/company/cmlogin.js';


export const company_login_api = express.Router();
const ns = `/user`;
 /* Final Code Functions*/
company_login_api.post(`${ns}/login`, async function (req, res) {
    try {
      const paramsObject = req.body;
     
      const objectdata = await cmloginmanager.login(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_login_api.post(`${ns}/sign_up`, async function (req, res) {
    try {
      const paramsObject = req.body;
     
      const objectdata = await cmloginmanager.signup(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_login_api.post(`${ns}/update_password`, async function (req, res) {
    try {
      const paramsObject = req.body;
     
      const objectdata = await cmloginmanager.update_password(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  
/* Ends*/

  company_login_api.post(`${ns}/access_list`, async function (req, res) {
    try {
      const paramsObject = req.body;
      
     
      const objectdata = await cmloginmanager.accesslist(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_login_api.post(`${ns}/access_list_id`, async function (req, res) {
    try {
      const paramsObject = req.body;
      const objectdata = await cmloginmanager.accesslistid(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_login_api.post(`${ns}/access_update`, async function (req, res) {
    try {
      const paramsObject = req.body;
     
      const objectdata = await cmloginmanager.accessupdate(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_login_api.post(`${ns}/access_delete`, async function (req, res) {
    try {
      const paramsObject = req.body;
     
      const objectdata = await cmloginmanager.accessdelete(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_login_api.post(`${ns}/login`, async function (req, res) {
    try {
      const paramsObject = req.body;
     
      const objectdata = await cmloginmanager.login(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_login_api.post(`${ns}/login_status`, async function (req, res) {
    try {
      const paramsObject = req.body;
      const objectdata = await cmloginmanager.loginstatus(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      
    }
  });