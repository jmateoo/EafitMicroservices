import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

const prisma = new PrismaClient()

export const requireAuthentication = (req, res, next) => {
  if (req.user) {
    next();
  }
  else {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "Login failed" });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      req.user = user;
      next();
    });
  }
};
  
export const manageAuth = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        next();
      }
      try {
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        req.user = user;
        next();
      } catch (error) {
        next();
      }
    });
  }
  else {
    next();
  }
};
  

export const cookieAuth = (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        next();
      }
      else {
        try {
          const user = await prisma.user.findUnique({ where: { id: decoded.id } });
          req.user = user;
          next();
        } catch (error) {
          next();
        }
      }
    });
  }
  else {
    next();
  }
  
};
  

export const echo = (req, res, next) => {
  console.log(req.method + ": " + req.protocol + '://' + req.get('host') + req.originalUrl);
  // console.log(JSON.stringify(req.headers));
  console.log(req.body);
  console.log(req.user);
  console.log("\n\n")
  next();
}