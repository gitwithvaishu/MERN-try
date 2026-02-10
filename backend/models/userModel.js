import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    'name':{
        required:true,
        type:"string"
    },
    'email':{
        required: true,
        type:"string"
    },
    'password': {
        required:true,
        type:"string",
        minlength: [6,"Password must be atleast 6 characters."]
    }
});

export default mongoose.model('User', userSchema);


