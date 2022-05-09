import { ResponseHandler } from "../utils";
const models = require("../models");
import bcrypt from "bcrypt";
const joi = require("joi");
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const SignIn = async (email: string, password: string) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const validation = schema.validate({
    email,
    password,
  });

  if (validation.error) {
    return ResponseHandler(422, validation.error.details[0].message);
  }
  const SECRET: any = process.env.JWT_SECRET_TOKEN;
  try {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return ResponseHandler(404, "Invalid Email or Password");
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return ResponseHandler(404, "Invalid Email or Password");
    }

    let token = jwt.sign(
      { id: user.id, email: user.email, role: user.email },
      SECRET
    );
    return ResponseHandler(200, "Login Successfull", { token });
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "An Error Occured");
  }
};

export const SignUp = async (email: string, password: string) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const validation = schema.validate({
    email,
    password,
  });

  if (validation.error) {
    return ResponseHandler(422, validation.error.details[0].message);
  }
  try {
    const userExist = await models.User.findOne({ where: { email } });
    if (userExist) {
      return ResponseHandler(409, "User Already Exist");
    }
    await models.User.create({
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      role: "user",
    });
    return ResponseHandler(201, "Account Created Successfully");
  } catch (error) {
    return ResponseHandler(500, "An Error Occured");
  }
};
