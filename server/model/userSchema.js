const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema(
{
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    work:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    cpassword:{
        type:String,
        required: true
    },
    tokens:[
        {
            token:{
                type:String,
                required: true
            }
        }
    ]

       
}
);



userSchema.pre('save',async function(next){
    //console.log("hello");
    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
});

userSchema.methods.generateJWT = async function(){
    try{
        let newToken=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:newToken});
        await this.save();
        return newToken;
    }catch(err)
    {
        console.log(err);
    }
};

const User=mongoose.model('USER',userSchema);

module.exports=User;