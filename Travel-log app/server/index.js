import express from 'express';
import {json} from 'express';
import dotenv from 'dotenv';
import Adminroute from './Routes/Adminroute.js';
import UserRoute from './Routes/UserRoute.js';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config()


const app=express()
app.use(cors({
    origin:'http://localhost:2002',
    credentials: true
}))
app.use(json())
app.use('/',Adminroute)
app.use('/',UserRoute)


const port=process.env.Port 

app.listen(port,function(){
    console.log(`Server running ${port}`);
    
})
mongoose.connect('mongodb://mongodb:27017/Travel_log_app')
  .then(() => {
    console.log('MongoDB Connected Successfully to Travel_log_app');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });