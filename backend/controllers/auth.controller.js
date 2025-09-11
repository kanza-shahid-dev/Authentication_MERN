import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
      console.log("Please enter all fields");
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    const userexists = await User.findOne({ email });

    if (userexists) {
      console.log("user exists");

      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    console.log("hashing : ");

    let salt = await bcrypt.genSalt(10);
    let hasedPassword = await bcrypt.hash(password, salt);

    let user = new User({
      name,
      email,
      password: hasedPassword,
    });

    await user.save();

    // email for verification

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err, "error in registering user");
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      token: generateTokenAndSetCookie(user, res),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
