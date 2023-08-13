const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


//  models schama
    const userSchema = new mongoose.Schema({
    usernmae:{
        type:String,
        require:[true , "Username  is Required"],
    },
    emali:{
        type:String,
        require:[true ,"email is Required"],
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlemgth:6,
    },
    customerId:{
        type:String,
        default:"",
    },
    subscription:{
        type:String,
        default:"",

    }
    });

        // hashed password 
        userSchema.pre('save' , async function(next){
            if(!this.isModified("password")){
                next()
            }
            const salt  = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password , salt)
            next()
        })


    //  mathched passward 
    userSchema.method.matchPasswprd = async function(password){
    return await bcrypt.compare(password, this.password)
    };

        //SIGN TOKEN
    userSchema.methods.getSignedToken = function (res) {
        const acccesToken = JWT.sign(
        { id: this._id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
        );
        const refreshToken = JWT.sign(
        { id: this._id },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_REFRESH_EXIPREIN }
        );
        res.cookie("refreshToken", `${refreshToken}`, {
        maxAge: 86400 * 7000,
        httpOnly: true,
        });
    };
    



const User = mongoose.model("User", userSchema)

module.exports = User;