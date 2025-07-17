export default (sequelize, type) => {
    return sequelize.define(
      'notificationtable',
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
    
      },
      
    );
};