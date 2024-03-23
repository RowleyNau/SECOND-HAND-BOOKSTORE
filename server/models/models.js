const sequelize = require('../db')
const {DataTypes}= require('sequelize')

const Clients = sequelize.define('clients'
, {   
    IdClients:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true}, 
    LastName:{type: DataTypes.TEXT}, 
    Name:{type: DataTypes.TEXT, allowNull: true},
    MiddleName:{type: DataTypes.TEXT},
    Phone:{type: "varchar(20)"},
    Mail:{type: DataTypes.TEXT},
    Password:{type: DataTypes.TEXT, allowNull: true}
},{ 
    timestamps: false,
    createdAt: false,
    updatedAt: false}
)
const Receptionofbooks = sequelize.define('receptionofbooks', {
    IdReceptionOfBooks:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
    IdClients:{type: DataTypes.INTEGER, allowNull: true}, 
    Comment:{type: DataTypes.TEXT}, 
    Safety:{type: DataTypes.TEXT},
    TransportAssistance:{type: DataTypes.BOOLEAN, allowNull: true},
    RequestDate:{type: DataTypes.DATE, allowNull: true}
},{ 
    timestamps: false,
    createdAt: false,
    updatedAt: false})
const Photobooksforreception = sequelize.define('photobooksforreception', {
    IdPhotoBooksForReception:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
    Photo:{type: DataTypes.TEXT, allowNull: true}, 
    IdReceptionOfBooks:{type: DataTypes.INTEGER, allowNull: true}
},{ 
    timestamps: false,
    createdAt: false,
    updatedAt: false})

Clients.hasMany(Receptionofbooks)
Receptionofbooks.belongsTo(Clients)

Receptionofbooks.hasMany(Photobooksforreception)
Photobooksforreception.belongsTo(Receptionofbooks)

sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

module.exports = {
    Clients, Receptionofbooks, Photobooksforreception 
}