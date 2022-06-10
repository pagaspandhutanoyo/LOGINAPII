import express from "express";
import db from "./config/database.js";
import dotenv from "dotenv";
import Users from "./models/UserModel.js";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connet');
    await Users.sync();
} catch (error) {
    console.error(error);
}
app.use(cors({ Credential: true, origin: 'http://localhost3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(5000, ()=> console.log('Server Running at port 5000'));