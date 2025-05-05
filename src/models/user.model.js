import mongoose, { Schema, Types } from "mongoose";
import jtw from "jsonwebtoken";
import bcrupt from "bcrupt";
const userSchema = new Schema(
    {
        usernme: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,    //cloudinary url
            require: true,
        },
        coverImage: {
            type: String,    //cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            require: [true, "pasword is require"],
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = bcrupt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrupt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function (){
    return jtw.sign({
        _id:this._id,
        email:this.email,
        usernme:this.usernme,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRTE,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.genrateRefreshToken = function (){
    return jtw.sign({
        _id:this._id,
        email:this.email,
        usernme:this.usernme,
        fullname:this.fullname
    },
    process.env.REFRESH_TOKEN_SECRTE,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema)