export default (sequelize, type) => {
    return sequelize.define(
      'eventposttable',
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: type.STRING,
        },
        description: {
            type: type.TEXT,
          },
        minprice: {
            type: type.STRING,
          },
        maxprice: {
            type: type.STRING,
          },
        youtubevideolink: {
            type: type.STRING,
          },
        filename: {
            type: type.STRING,
          },
      },
      
    );
};