import { Request, Response } from "express";
import { AuthSchema, signinSchema } from "../types/AuthScheme";
import { user } from "../model/user";
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
    await user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "user is created..",
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
    const existingUser = await user.findOne({
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
        email,
      },
      ENV.JWT_SECRETE as string
    );

    return res
      .status(200)
      .json({
        message: "User is signin",
        token: token,
      })
      .cookie("token", token);
  } catch (error) {
    res.json({
      message: "Internal server error",
      error: error,
    });
  }
};


export const updateUser=async ()=>{


}