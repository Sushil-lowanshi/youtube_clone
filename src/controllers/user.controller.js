import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    
    // res.status(200).json({
    //     message:"ok"
    // })

    // get user details frome frontend
    // validation not empty
    // check if user already exiest - username email
    // check for image , avatar
    // upload them to cloudinary avatar
    // create user object , create entry in db
    // remove password and refreshtoken from response
    // check for user creation 
    // return res

const {fullName, email, username, password} = req.body

if([fullName, email, username, password].some((value)=> value?.trim() === "")){
    throw new ApiError(400, "All Fields Are Required")
}

const exiestedUser = await User.findOne({
    $or: [{username},{email}]
})
if(exiestedUser){
    throw new ApiError(409, "User Already Existed")
}
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400, "Avatar image is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400, "Avatar image is 'required'")
   
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    usernme: username.toLowerCase(),
})

const createdUser = await User.findById(user._id).select("-password -refreshToken")
console.log("createdUser : ", createdUser)
if(!createdUser){
    throw new ApiError(500, "someting went wrong while registering the user")
}

return res.status(200).json(
    new ApiResponse(200, createdUser, "User registerd successfully")
)


})

export {registerUser}