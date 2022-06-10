import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name: {
        type: DataTypes.STRING,
        allowNul: false,
    },
    gender: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    noTelepon: {
        type: DataTypes.NUMBER,
    },
    kelas: {
        type: DataTypes.NUMBER,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
},{
    freezeTableName:true
}
);

export default Users;