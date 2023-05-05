import express from "express";
import { signinController, signupController, signoutController, isSigninController } from "../controllers/auth.controllers.js";
import { methodNotAllowed } from "../utils/functions.js";

const router = express.Router();

router.route("/signup").post(signupController).all(methodNotAllowed);
router.route("/signin").post(signinController).all(methodNotAllowed);
router.route("/checksignin").post(isSigninController).all(methodNotAllowed);
router.route("/signout").post(signoutController).all(methodNotAllowed);

export default router;
