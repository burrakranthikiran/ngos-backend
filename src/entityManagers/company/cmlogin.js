
import { MODELS } from '../../sequelize.js';
export class cmloginmanager {
      /* Final Code Functions*/
    static async login(dataArray) {
        const { LoginTable } = MODELS;
        let datamap = dataArray[0];
       
      
       let rest;
        try {
        const LoginTableData = await LoginTable.findAll({
                where: { 
                    mobilenumber: datamap.mobilenumber,
                    password: datamap.password, 
                }
            });
            if(LoginTableData.length != 0){
                rest = LoginTableData;
            }else{
                rest = "Null"
            }
            return rest;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async signup(dataArray) {
        const { LoginTable } = MODELS;
        let datamap = dataArray[0];
       let rest;
       let logincreateid;
        try {
        const LoginTableData = await LoginTable.findAll({
                where: { 
                    mobilenumber: datamap.mobilenumber,
                }
            });
            if(LoginTableData.length != 0){
                rest = "Exesting"
            }else{
              
                logincreateid = await LoginTable.create({
                    usertype:'user',
                    name: datamap.name,
                    location: datamap.location,
                    mobilenumber: datamap.mobilenumber,
                    password: datamap.password,
                });
                rest = logincreateid
            }
            return rest;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async update_password(dataArray) {
        const { LoginTable } = MODELS;
        let datamap = dataArray[0];
        let rest;
        try {
            const existingLogin = await LoginTable.findOne({
                where: { id: datamap.id }
            });

            if (existingLogin) {
                await existingLogin.update({
                    password: datamap.password,
                });

                // Update associated roles
              
                rest = "Updated";
            } else {
                rest = "Not found";
            }
            return rest;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }
    }

/* Ends*/


    
    static async accesslist(dataArray) {
        const { LoginTable, LoginDetailsTables } = MODELS;
        let rest;
        let filterdata = [];
        const offsetvalue = dataArray[0].offset;
        try {
            if(dataArray[0].boothsname != ""){
                rest = await LoginTable.findAll({ where: { 
                    stateName: dataArray[0].stateName || null,  
                    districtName: dataArray[0].districtName || null,
                    constituenciesname: dataArray[0].constituenciesname || null,
                    mandalsname: dataArray[0].mandalsname || null,
                    sectorname: dataArray[0].sectorname || null,
                    villagename: dataArray[0].villagename || null,
                    boothsname: dataArray[0].boothsname || null,
                    accounttype: 'Booths' || null, 
                }, offset: offsetvalue, limit: 1000 },{
                    include: [LoginDetailsTables]
            });
                 if(rest.length != 0){
                    filterdata.push(...rest); 
                }
            }else if(dataArray[0].villagename != ""){
                rest = await LoginTable.findAll({ where: { 
                    stateName: dataArray[0].stateName || null,  
                    districtName: dataArray[0].districtName || null,
                    constituenciesname: dataArray[0].constituenciesname || null,
                    mandalsname: dataArray[0].mandalsname || null,
                    sectorname: dataArray[0].sectorname || null,
                    villagename: dataArray[0].villagename || null,
                    accounttype: 'VWD' || null, 
                }, offset: offsetvalue, limit: 1000 },{
                    include: [LoginDetailsTables]
            });
                 if(rest.length != 0){
                    filterdata.push(...rest); 
                }
            }else if(dataArray[0].sectorname != ""){
                rest = await LoginTable.findAll({ where: { 
                    stateName: dataArray[0].stateName || null,  
                    districtName: dataArray[0].districtName || null,
                    constituenciesname: dataArray[0].constituenciesname || null,
                    mandalsname: dataArray[0].mandalsname || null,
                    sectorname: dataArray[0].sectorname || null,
                    accounttype: 'Sector' || null, 
                }, offset: offsetvalue, limit: 1000 },{
                    include: [LoginDetailsTables]
            });
                 if(rest.length != 0){
                    filterdata.push(...rest); 
                }
            }else if(dataArray[0].mandalsname != ""){
                rest = await LoginTable.findAll({ where: { 
                    stateName: dataArray[0].stateName || null,  
                    districtName: dataArray[0].districtName || null,
                    constituenciesname: dataArray[0].constituenciesname || null,
                    mandalsname: dataArray[0].mandalsname || null,
                    accounttype: 'CMM' || null, 
                }, offset: offsetvalue, limit: 1000 },{
                    include: [LoginDetailsTables]
            });
                 if(rest.length != 0){
                    filterdata.push(...rest); 
                }
            }else if(dataArray[0].constituenciesname != ""){
                rest = await LoginTable.findAll({ where: { 
                    stateName: dataArray[0].stateName || null,  
                    districtName: dataArray[0].districtName || null,
                    constituenciesname: dataArray[0].constituenciesname || null,
                    accounttype: 'Constituencies' || null, 
                }, offset: offsetvalue, limit: 1000 },{
                    include: [LoginDetailsTables]
                });
                 if(rest.length != 0){
                    filterdata.push(...rest); 
                }
            }else if(dataArray[0].districtName != ""){
                rest = await LoginTable.findAll({ where: { 
                    stateName: dataArray[0].stateName || null,  
                    districtName: dataArray[0].districtName || null,
                    accounttype: 'District' || null,  
                }, offset: offsetvalue, limit: 1000 },{
                    include: [LoginDetailsTables]
                });
                 if(rest.length != 0){
                    filterdata.push(...rest); 
                }
            }else if(dataArray[0].stateName != ""){
                rest = await LoginTable.findAll({ where: { 
                    stateName: dataArray[0].stateName || null,  
                    accounttype: 'States' || null,  
                }, offset: offsetvalue, limit: 1000 },{
                    include: [LoginDetailsTables]
                });
                 if(rest.length != 0){
                    filterdata.push(...rest); 
                }
            }
        // const LoginTableData = await LoginTable.findAll({
        //     include: [LoginDetailsTables] 
        // });
            
            return filterdata;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async accesslistid(dataArray) {
        const { LoginTable} = MODELS;
        let datamap = dataArray[0];
        try {
            const LoginTableData = await LoginTable.findByPk(datamap.id);
            
            return LoginTableData;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async accessdelete(dataArray) {
        const { LoginTable, LoginDetailsTables } = MODELS;
        let datamap = dataArray[0];
        try {
            await LoginDetailsTables.destroy({
                where: { logintableId:datamap.id }
            });
            await LoginTable.destroy({
                where: { id:datamap.id }
            });
            
            const LoginTableData = await LoginTable.findAll({
                include: [LoginDetailsTables] 
            });
            return LoginTableData;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }
    }



    
   

    static async loginstatus(dataArray) {
        const { LoginTable, LoginDetailsTables } = MODELS;
        let datamap = dataArray[0];
       console.log("33333333333333", dataArray[0].id);
      
       let rest;
        try {
        const LoginTableData = await LoginTable.findAll({
                where: { 
                    id: dataArray[0].id,
                }
            });
            
            if(LoginTableData.length != 0){
                const numberlogin = LoginTableData[0].dataValues.numberlogin;
                console.log(numberlogin);
                if(numberlogin === "0"){
                    rest = "True";
                }else{
                    
                    await LoginTable.update(
                        { numberlogin: '0' }, // Update with the new value
                        { where: { id: dataArray[0].id } } // Condition to match the record
                    );
                    rest = "False";
                }
                
            }else{
                rest = "False"
            }
            return rest;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }
}
