import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        required: [true, "Name is required"],
        type: Schema.Types.String    
    },
    email: {
        required: [true, "Email is required"],
        type: Schema.Types.String ,
        unique: true
    },
    password: {
        type: Schema.Types.String    
    },
    
})

// agar model already created hai toh uska instance de de . wrna naya model design krke de de
export const User = mongoose.models.User || mongoose.model("User", userSchema);