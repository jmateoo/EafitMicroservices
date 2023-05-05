import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import { wrappedResponse } from "../utils/functions.js";

const prisma = new PrismaClient()

export const signupController = async (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.name) {
        return wrappedResponse(res, "Email, password or name not given!", 400, null);
    }
    const isExist = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (isExist) {
        return wrappedResponse(res, "User exists", 400, null);
    }
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 8)
        }});
    return wrappedResponse(res, "User created successfully!", 201, user);
};

export const signinController = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return wrappedResponse(res, "Email or password not given!", 400, null);
    }
    const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (!user) {
        console.log("User not found!");
        return wrappedResponse(res, "User not found!", 404, null);
    }

    let passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
    );

    if (!passwordIsValid) {
        console.log("Invalid Password!");
        return wrappedResponse(res, "Invalid Password!", 401, null);
    }

    let token = jwt.sign({ id: user.id }, config.secret);
    res.cookie("jwt", token, {
        // httpOnly: true,
    });
    console.log("User signed in successfully!");
    return wrappedResponse(res, "User signed in successfully!", 200, {
        id: user.id,
        email: user.email,
        accessToken: token
    });
};

export const isSigninController = async (req, res) => {
    if (req.user) {
        return wrappedResponse(res, "Signed in!", 200, {result: true});
    }
    else {
        return wrappedResponse(res, "Not signed in!", 403, {result: false});
    }
};

export const signoutController = async (req, res) => {
    res.clearCookie("jwt");
    console.log("User signed out successfully!");
    return wrappedResponse(res, "User signed out successfully!", 200, {});
};