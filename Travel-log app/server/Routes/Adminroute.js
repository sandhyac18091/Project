import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { register } from "../Models/signup.js"; 
import add from "../Models/addlog.js";
import authenticate from "../Middleware/auth.js";
import authorizeAdmin from '../Middleware/authadmin.js'


dotenv.config()

const Adminroute = Router()
const secretkey = process.env.Secretkey

// Adminroute.post('/Signup', async (req, res) => {
//     try {
//         const { Firstname, Lastname, Username, Email, Password, Userrole } = req.body;


//         const newp = await bcrypt.hash(Password, 10);
//         const sign = await register.findOne({ email: Email });

//         if (sign) {
//             return res.status(400).json({ message: 'Email already used' });
//         } else {
//             const newUser = new register({
//                 firstname: Firstname,
//                 lastname: Lastname,
//                 username: Username,
//                 email: Email,
//                 password: newp,
//                 userrole: Userrole
//             });

//             await newUser.save();
//             const userRole = email.endsWith('@admin.com') ? 'Admin' : 'User';
//             res.status(201).json({ message: "Registered Successfully" });
//         }
//     } catch (error) {
//         console.error(" Error in Signup:", error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// });

Adminroute.post('/Signup', async (req, res) => {
    try {
        const { Firstname, Lastname, Username, Email, Password } = req.body;

        const newp = await bcrypt.hash(Password, 10);
        const sign = await register.findOne({ email: Email });

        if (sign) {
            return res.status(400).json({ message: 'Email already used' });
        } else {
            
            const Userrole = Email.endsWith('@admin.com') ? 'Admin' : 'User';

            const newUser = new register({
                firstname: Firstname,
                lastname: Lastname,
                username: Username,
                email: Email,
                password: newp,
                userrole: Userrole  
            });

            await newUser.save();
            res.status(201).json({ message: "Registered Successfully" });
        }
    } catch (error) {
        console.error("Error in Signup:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


Adminroute.post('/Login', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log(Email);
        

        const result = await register.findOne({ email: Email });

        if (!result) {
            console.log('Enter valid email id');
            return res.status(400).json({ message: 'Enter a valid email ID' });
        } else {

            const compare = await bcrypt.compare(Password, result.password);

            console.log(compare);
            console.log(result.userrole);

            if (compare) {

                const token = jwt.sign({ userId: result._id, Email: result.email, Userrole: result.userrole }, secretkey, { expiresIn: '1h' });

                console.log(token);
                res.cookie('authToken', token, {
                    httpOnly: true
                });

                
                res.status(200).json({ message: 'Login successfully',userId: result._id, });
            } else {
                res.status(401).json({ message: 'Unauthorized access' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




Adminroute.get("/profile", authenticate, async (req, res) => {
    try {
        const userId = req.userId;  

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

       
        const user = await register.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



  
Adminroute.get("/totalUsers", async (req, res) => {
    try {
        const count = await register.countDocuments(); 
        res.json({ totalUsers: count });
    } catch (error) {
        console.error("Error fetching users count:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


Adminroute.get("/totalLogs", async (req, res) => {
    try {
        const count = await add.countDocuments(); 
        res.json({ totalLogs: count });
    } catch (error) {
        console.error("Error fetching logs count:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


Adminroute.get("/getLogs", async (req, res) => {
    try {
        const logs = await add.find();
        res.json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


Adminroute.delete("/deleteLog/:id", async (req, res) => {
    try {
        const logId = req.params.id;
        const deletedLog = await add.findByIdAndDelete(logId);

        if (!deletedLog) {
            return res.status(404).json({ msg: "Log not found" });
        }

        res.json({ msg: "Log deleted successfully" });
    } catch (error) {
        console.error("Error deleting log:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
Adminroute.get('/admin-dashboard', authorizeAdmin, (req, res) => {
    res.send('Welcome to the Admin Dashboard!');
});



Adminroute.get('/logout',(req,res)=>{
    res.clearCookie('authToken')
    res.status(200).json({message:'Logout successfully'})
  })

export default Adminroute;