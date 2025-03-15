import mongoose from "mongoose";


const signSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userrole:{ type: String, required: true }
});


const register = mongoose.model("Signupdetails", signSchema);


const logsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Signupdetails", required: true, index: true },
});


const MyLogs = mongoose.model("mylog", logsSchema);


export { register, MyLogs };
