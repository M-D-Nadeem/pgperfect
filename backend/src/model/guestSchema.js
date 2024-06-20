import mongoose from "mongoose";
import  jwt from "jsonwebtoken"

const guestSchema = new mongoose.Schema({
    loginId:{type:String},
    loginPassword:{type:String},
    
    propertyId:{type:String,required:true},
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
    room: {
        roomShearing:{type:Number,required:true},
        roomNo:{type:Number,required:true},
    },
    subscription:{
        amount:{type:Number},
        paymentDate: { type: Date, default: Date.now },
        lastPaymentDate: { type: Date, default: null }
    },
    deposit:{
        id:{type:String},
        link:{type:String},
        amount:{type:Number},
        status:{type:String},
    },
    role:{
        type:String
    },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'complaint' }],
  });
  
  guestSchema.methods={
    jwtToken(){
        return jwt.sign(
            {id:this._id,email:this.email,role:"user",loginId:this.loginId,subscription:this.subscription},
            process.env.JWT_SECRET_CODE,
            {expiresIn:'24h'} 
        )
    }
}
export default mongoose.model('guest', guestSchema);
