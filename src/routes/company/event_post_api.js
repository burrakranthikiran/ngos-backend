import express from 'express';
export const company_event_post_api = express.Router();
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { cmeventpostmanager } from '../../entityManagers/company/cmevent.js';
const ns = `/post`;

company_event_post_api.post(`${ns}/uploadimage`, async function (req, res) {
    try {
      const paramsObject = req.body;
      if(paramsObject[0].filename == null || paramsObject[0].imageurl === ''){   
       }else{
    // Remove the data URL prefix for any image type (JPEG, PNG, etc.)
    const base64Data = paramsObject[0].imageurl.replace(/^data:image\/(png|jpeg|jpg|webp|gif|bmp|tiff|svg|hefif|psd|ioc);base64,/, ''); // Remove the data URL prefix
    
    const fileName = `${paramsObject[0].filename}`;// Generate a unique file name or use data.orderNumber
    // Convert base64 to binary buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');
    // Write the buffer to a file in the uploads folder
    fs.writeFileSync(path.join('uploads/images', fileName), imageBuffer);
    }
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error'});
    }
  });

  company_event_post_api.get(`${ns}/:image_name`, async function (req, res) {
    try {
      const imageName = req.params.image_name; // Get the image name from the URL parameter
      const imagePath = path.join("uploads/images", imageName);
      if (fs.existsSync(imagePath)) {
        // Read the image file
        const image = fs.readFileSync(imagePath);

        // Determine the image type based on the filename extension
        const imageType = path.extname(imageName).substring(1);

        // Set the appropriate content type for the response based on the image type
        switch (imageType.toLowerCase()) {
            case 'png':
                res.contentType('image/png');
                break;
            case 'jpg':
            case 'jpeg':
                res.contentType('image/jpeg');
                break;
            default:
                res.contentType('image/jpeg');
                break;
        }

         // Send the image as the response
        res.send(image);
    } else {
        res.status(404).json({ error: 'Image not found' });
    }
     
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'An error occurred while fetching the image.' });
    }
  });

  company_event_post_api.post(`${ns}/create`, async function (req, res) {
    try {
      const paramsObject = req.body;
      const objectdata = await cmeventpostmanager.create(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_event_post_api.post(`${ns}/list`, async function (req, res) {
    try {
      const objectdata = await cmeventpostmanager.list();
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_event_post_api.post(`${ns}/list_id`, async function (req, res) {
    try {
        const paramsObject = req.body;
      const objectdata = await cmeventpostmanager.listid(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });
  company_event_post_api.post(`${ns}/update`, async function (req, res) {
    try {
      const paramsObject = req.body;
      const objectdata = await cmeventpostmanager.update(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });

  company_event_post_api.post(`${ns}/delete`, async function (req, res) {
    try {
      const paramsObject = req.body;
      const objectdata = await cmeventpostmanager.destroy(paramsObject);
      res.status(201).json(objectdata);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Error' });
    }
  });