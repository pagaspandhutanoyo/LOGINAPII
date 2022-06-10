//import sequelize from "sequelize";
import { Sequelize } from "sequelize";


const db = new Sequelize('buku','root','',{
  host: "localhost",
  dialect: "mysql"
});

export default db;

