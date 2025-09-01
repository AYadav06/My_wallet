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
  console.log("user is in createUser controller");
  try {
    const result = AuthSchema.safeParse(req.body);
    if (!result.success) {
      return res.json({
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

    res
      .status(200)
      .cookie("token", token)
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
  const { email, password } = result.data;
  try {
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return res.json({
        message: "user is not exist",
      });
    }
    const validPassword = await bcrypt.compare(
      result.data.password,
      existingUser.password!
    );
    if (!validPassword) {
      return res.json({ message: "password is incorrect" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      ENV.JWT_SECRETE as string
    );

    return res
      .status(200)
      .cookie("token", token)
      .json({
        message: "User is signin",
        token: token,
      });
  } catch (error) {
    res.json({
      message: "Internal server error",
      error: error,
    });
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
