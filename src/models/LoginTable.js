export default (sequelize, type) => {
    return sequelize.define(
      'logintable',
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        usertype: {
          type: type.STRING,
        },
        name: {
            type: type.STRING,
          },
        location: {
            type: type.STRING,
          },
        mobilenumber: {
            type: type.STRING,
          },
        password: {
            type: type.STRING,
          },
      },
      
    );
};