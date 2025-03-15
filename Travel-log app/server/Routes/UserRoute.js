import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import add  from "../Models/addlog.js";
import upload from "../Middleware/uploads.js";


const UserRoute=Router()

const convertToBase64 = (buffer) => {
    return buffer.toString('base64');
};
UserRoute.post('/addlog',authenticate,upload.single("logImage"),async(req,res)=>{
    
    try{
        const{Logid,Category,Placename,Dateoftravel,Description,Rating}=req.body
        console.log(req.body);
        
        const existinglog=await add.findOne({logid:Logid})
    if(existinglog){
        res.status(403).json({message:"Already exist this logid"})
    }else{
        let imageBase64 = null;
      if (req.file) {
        imageBase64 = convertToBase64(req.file.buffer)
      }
        const newUser=new add({
            
            logid:Logid,
            category:Category,
            placename:Placename,
            dateoftravel:Dateoftravel,
            description:Description,
            rating:Rating,
            image:imageBase64,
            email: req.Email
        })
        await newUser.save();
        res.status(201).json({message:'log Successfully added'})
        
        
    }
    }catch{
        // console.log(error);
        res.status(500).json({message:'Internal Server error'})
        
    }
})

UserRoute.post('/toggleFavorite/:id', async (req, res) => {
  try {
      const log = await add.findById(req.params.id);
      if (!log) {
          return res.status(404).json({ message: 'Log not found' });
      }
      
      log.favorite = !log.favorite;
      await log.save();

      res.status(200).json({ message: 'Favorite status updated', log });
  } catch (error) {
      res.status(500).json({ message: 'Error updating favorite status' });
  }
});


UserRoute.get('/getFavoriteLogs', async (req, res) => {
  try {
      const favoriteLogs = await add.find({ favorite: true });
      res.status(200).json(favoriteLogs);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching favorite logs' });
  }
});







UserRoute.get('/getlog/:Placename', async (req, res) => {
    try {
      const name = req.params.Placename; 
      console.log("Requested log:", name);
  
      if (!name) {
        return res.status(400).json({ msg: "Place name is required" });
      }
  
      const result = await add.findOne({ placename: name });
  
      if (!result) {
        return res.status(404).json({ msg: "No such log found" });
      }
  
      res.status(200).json({
        Placename: result.placename,
        Category: result.category,
        Dateoftravel: result.dateoftravel,
        Description: result.description,
        Rating: result.rating,
        imageUrl: result.image ? `/api/getLogImage/${encodeURIComponent(name)}` : null,
      });
  
    } catch (error) {
      console.error("Error fetching log:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });
  

  UserRoute.get('/getallLog', async (req, res) => {
    try {
        const logs = await add.find({});
        console.log("Fetched Logs:", logs); 
        res.json(logs);  
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});






// UserRoute.get('/mylogs', authenticate, async (req, res) => {
//   try {
//       console.log('Authenticated User:', req.Username);

      
//       const user = await register.findOne({ username: req.Username });
//       if (!user) {
//           console.log('User not found');
//           return res.status(404).json({ error: "User not found" });
//       }

//       console.log("User ID:", user._id);

//       // Find the user's logs
//       const userLogs = await MyLogs.find({ username: req.Username });

//       if (!userLogs.length) {
//           console.log("No logs found for user:", req.username);
//           return res.status(404).json({ error: "No logs found for this user" });
//       }

//       res.status(200).json(userLogs);

//   } catch (err) {
//       console.error("Error fetching logs:", err);
//       res.status(500).json({ msg: "Internal Server Error" });
//   }
// });








UserRoute.get('/api/getLogImage/:Placename', async (req, res) => {
  try {
      const name = req.params.Placename;
      const log = await add.findOne({ placename: name });

      if (!log || !log.image) {
          return res.status(404).json({ msg: "Image not found" });
      }

      res.set("Content-Type", "image/png"); 
      res.send(log.image); 
  } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
});




  

UserRoute.patch("/editlog", authenticate, async (req, res) => {
  try {
    const { Placename, Dateoftravel, Description, Rating } = req.body;
    
    const result = await add.findOne({ placename: Placename });

    if (result) {
      result.dateoftravel = Dateoftravel;
      result.description = Description;
      result.rating = Rating;
      
      await result.save();
      res.status(201).json({ message: "Log updated successfully" });
    } else {
      res.status(404).json({ message: "Log not found" });
    }
  } catch (error) {
    console.error("Error during log update:", error);
    res.status(500).json({ message: "Server error" });
  }
});
UserRoute.get('/myLogs', authenticate, async (req, res) => {
  try {
      const logs = await add.find({ email: req.Email });
      res.json(logs);
  } catch (error) {
      res.status(500).json({ message: "Error fetching logs" });
  }
});




  

UserRoute.get('/logout',(req,res)=>{
    res.clearCookie('authToken')
    res.status(200).json({message:'Logout successfully'})
  })


export default UserRoute;