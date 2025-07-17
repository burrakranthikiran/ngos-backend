
import { MODELS } from '../../sequelize.js';
export class cmeventpostmanager {
      /* Final Code Functions*/
    static async create(dataArray) {
        const { EventPostTable } = MODELS;
        let datamap = dataArray[0];
        let eventposttable;
        try {
                eventposttable = await EventPostTable.create({
                    title:datamap.title || null,
                    description: datamap.description || null,
                    minprice: datamap.minprice || null,
                    maxprice: datamap.maxprice || null,
                    youtubevideolink: datamap.youtubevideolink || null,
                    filename: datamap.filename || null,
                });
              
            return eventposttable;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async list() {
        const { EventPostTable } = MODELS;
        let eventposttable;
        try {

             eventposttable = await EventPostTable.findAll({});
            return eventposttable;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async listid(dataArray) {
        const { EventPostTable } = MODELS;
        let datamap = dataArray[0];
        let eventposttable;
        try {
            eventposttable = await EventPostTable.findByPk(datamap.id);
            return eventposttable;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async update(dataArray) {
        const { EventPostTable } = MODELS;
        let datamap = dataArray[0];
        let eventposttable;
        try {
            eventposttable = await EventPostTable.update({
                title: datamap.title || null,
                description: datamap.description || null,
                minprice: datamap.minprice || null,
                maxprice: datamap.maxprice || null,
                youtubevideolink: datamap.youtubevideolink || null,
                filename: datamap.filename || null,
            }, {
                where: { id: datamap.id } // Add a condition to update based on id
            });
              
            return eventposttable;
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async destroy(dataArray) {
        const { EventPostTable } = MODELS;
        let datamap = dataArray[0];
        try {
            await EventPostTable.destroy({
                where: { id: datamap.id } // Add a condition to delete based on id
            });
        } catch (error) {
            console.error('Error', error);
            throw error; // Rethrow the error to handle it in the calling code
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
        const { LoginTable, LoginDetailsTables , VoterTable, PartyMembers} = MODELS;
        let datamap = dataArray[0];
        try {
            const LoginTableData = await LoginTable.findByPk(datamap.id, {
                include: [{
                   model: LoginDetailsTables,
                   

                },{
                    model: VoterTable,
                    include: [{
                        model: PartyMembers,
                     }]
                }]
            });
            
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
