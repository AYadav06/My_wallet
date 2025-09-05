import { Request, Response } from "express";
import {
  AuthSchema,
  signinSchema,
  updateUserSchema,
} from "../types/AuthScheme";
import { Account, User } from "../model/db";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = AuthSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error,
      });
    }
    const { firstName, lastName, email, password } = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
     const userId=user._id;
     await Account.create({
        userId,
        balance:1+Math.random()*10000
     })


    const token = jwt.sign(
      {
        userId,
      },
      ENV.JWT_SECRETE as string
    );

    // Use env-driven cookie options
    const cookieOptions = {
      httpOnly: true as const,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        message: "user is created..",
        token,
      });
  } catch (e) {
    res.json({
      message: "user is not created ...",
      error: e,
    });
  }

};

export const signinUser = async (req: Request, res: Response) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(500).json({
      message: "Invalid Input",
      error: result.error,
    });
  }
  const { email } = result.data;
  try {
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "user is not exist",
      });
    }
    const validPassword = await bcrypt.compare(
      result.data.password,
      existingUser.password!
    );
    if (!validPassword) {
      return res.status(400).json({ message: "password is incorrect" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      ENV.JWT_SECRETE as string
    );

    const cookieOptions = {
      httpOnly: true as const,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("token", token, cookieOptions)
      .json({
        message: "User is signin",
        token: token,
      });
  } catch (error) {
    res.status(200).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } });
    res.json(users.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    })));
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const parsedData = updateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(411).send("error while updating user ");
    return;
  }

  try {
    const { firstName, lastName, password } = parsedData.data;
    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (password)
      updateData.password = await bcrypt.hash(parsedData.data.password!, 10);

    await User.updateOne(
      {
        _id: req.userId,
      },
      { $set: updateData }
    );

    res.json({
      message: "user is updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
  res.clearCookie("token", cookieOptions).json({ message: "Logged out successfully" });
};
