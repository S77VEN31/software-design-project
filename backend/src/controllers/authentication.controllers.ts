// Express
import { Request, Response } from "express";
// Models
import { User } from "../models";
// Encrypt library
import bcrypt from "bcryptjs";
// Libs
import { createAccessToken } from "../libs";
// Middlewares
import { PermissionManager, RoleManager } from "../middlewares";
// Types
import { Role } from "../types";


export const register = async (req: Request, res: Response) => {
  try {
    const { userName, email, password, name } = req.body;

    const role = RoleManager.getRole(email);

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user instance and save it
    const newUser = new User({
      userName,
      email,
      password: passwordHash,
      roles: [role],
      name,
    });
    await newUser.save();

    // Create an access token for the new user
    const token = await createAccessToken({ sub: newUser._id.toString() });
    res.cookie("token", token, { httpOnly: true });

    // Send the new user in the response
    return res.status(200).json(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: ["Email or username already in use"] });
    }
    return res.status(500).json({ message: [error] });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: ["User not found"] });
    }

    // Compare password
    const isCorrect = await bcrypt.compare(password, userFound!.password);
    if (!isCorrect) {
      return res.status(400).json({ message: ["Invalid password"] });
    }

    // Get permissions
    if (!userFound.roles) {
      return res.status(400).json({ message: ["User has no roles"] });
    }

    const permissions = PermissionManager.getPermissionsByRoles(
      userFound.roles as Role[]
    );

    // Create token with userFound._id
    const token = await createAccessToken({ id: userFound!._id });
    res.cookie("token", token);

    // Send userFound and permissions
    return res.status(200).json({
      permissions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: [error] });
  }
};

export const logout = (res: Response) => {
  // Clear cookie
  res.cookie("token", "", { expires: new Date(0) });
  // Send status
  res.status(200).json({ message: ["Logged out"] });
};
