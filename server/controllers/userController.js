import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullName,
      email,
      passwordHash: hash,
    });

    const token = await jwt.sign({_id: newUser._id}, 'jwt-secret',       {
      expiresIn: '30d',
    },);

    res.status(200).cookie('token', token, {
      maxAge: 3*24*60*60*1000,
    }).json({
      success: true,
      message: "User created and token sent successfully",
      user: newUser,
      token
    });
    
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};


export const login = async(req, res) => {
  try {
    const { email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
      throw new Error('Not exist email');
    };
    
    const comparePassword = await bcrypt.compare(password, user.passwordHash);
    if(!comparePassword){
      throw new Error('Not correct password or email');
    };

    const token = await jwt.sign({_id: user._id}, 'jwt-secret',       {
      expiresIn: '30d',
    },);

    res.status(200).json({
      success: true,
      message: "User login and token sent successfully",
      user,
      token
    });
    
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
}

export const getMe = async(req, res) => {
  try {
    const user = await userModel.findById(req.user.user_id);
    if(!user) {
      throw new Error('No such user exist');
    }
    res.status(200).json({
      success: true,
      user
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
}