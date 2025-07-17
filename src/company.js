import dotenv from "dotenv";
dotenv.config();
import { loadConfig } from "./config/config.js";

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import cors from "cors";
import { companyApis } from "./routes/company/company_api.js";


import { sequelize, startConnection } from "./sequelize.js";




const init = async () => {
  console.log(`process.env.NODE_ENV?`, process.env.NODE_ENV);
  const envConfig = loadConfig(process.env.NODE_ENV);

  startConnection();

  const app = express();
  app.use(cors());
  app.use(
    morgan("combined", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );

  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    bodyParser.json({
      limit: "300mb",
    })
  );

  app.use(express.static("uploads"));
  app.use(companyApis);
  app.set('view engine', 'ejs');


  
  

  const usePort = process.env.USE_PORT || `API_PORT`;
  const portNo = process.env.COMPANY_PORT
  console.log(
    `USE_PORT?? ${process.env.USE_PORT}`,
    usePort,
    `npm_config_PORT?`,

    portNo
  );

  app.listen(portNo, () => {
    console.log(`START:: Listening on API_PORT ${portNo}!`);
    console.log(`START:: ENV MODE ${JSON.stringify(process.env.NODE_ENV)}!`);
    process.env.PORT = portNo;
    console.log(`process.env.PORT?`, process.env.PORT);


  });
};
init();
