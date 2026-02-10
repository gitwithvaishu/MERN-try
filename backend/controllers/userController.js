import User from '../models/userModel.js';

export const createUser = async (req,res) => {
    try {
        // console.log("Creating");
        const newUser = new User(req.body);
        const {email} = newUser;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(200).json({message:"User Already exist."});
        }

        const saveduser = await newUser.save();

        // return res.status(200).json(saveduser);
        return res.status(200).json({message: "User registered successfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getUsers = async (req,res)=>{
    try {
        const users = await User.find();
        if(!users || users.length === 0){
            res.status(404).json({message:"No users found"});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error});
    }
};

export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message:"User not found."})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error});
    }
};

export const updateUser = async (req,res)=>{
    try {
       const user = await User.findById(req.params.id);
       if(!user){
        res.status(404).json({message:"User Not found."});
       } 
       const upadateUser = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
    //    res.status(200).json(upadateUser);
       return res.status(200).json({message: "User updated successfully."});
    } catch (error) {
        res.status(500).json({message:error});
    }
};

export const deleteUser = async (req,res)=>{
    try {
       const user = await User.findById(req.params.id);
       if(!user){
        res.status(404).json({message:"User Not found."});
       } 
       const upadateUser = await User.findByIdAndDelete(req.params.id, req.body,{new:true});
       res.status(200).json({message: "User Deleted successfully."});
    } catch (error) {
        res.status(500).json({message:error});
    }
};