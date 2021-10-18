const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    }    
});
const User = mongoose.model('user',UserSchema);
User.createIndexes();
module.exports = User;