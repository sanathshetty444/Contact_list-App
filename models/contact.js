const mongoose=require('mongoose');
const contactschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
//model is for making collections
const Contact=mongoose.model('Contact',contactschema);
module.exports=Contact