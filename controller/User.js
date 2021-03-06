import Users from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll({
            attributes:['id','name','email','username','gender']
        });
        res.json(users);
    }catch(error){
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { name, gender, email, noTelepon, username,kelas, password, confPassword } = req.body;
    if(password !== confPassword) 
    return res.status(400).json({msg: "Password tidak cocok"});
    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, salt);
    try {
        await Users.create({
            name: name,
            gender: gender,
            email: email,
            noTelepon: noTelepon,
            kelas: kelas,
            username: username,
            password: hashPassword
        });
        res.json({msg: "register Berhasil"})
    }catch(error){
        //console.log(error);
        res.status(404).json({ msg: "register gagal" });
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcryptjs.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "password salah"})
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const username = user[0].username;
        
        const accessToken = jwt.sign({ userId, name, email, username }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, email, username }, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token:refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({msg : "email tidak ditemukan"});
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}