import express from "express";
import { createBicycleController, deleteBicycleController, getBicycleControllerById, listBicycleController, updateBicycleController } from "../controllers/index.controllers.js";
import { methodNotAllowed } from "../utils/functions.js";
import { requireAuthentication } from "../middlewares/authJWT.js";

const router = express.Router();
router.use(requireAuthentication);
router.route("/").get(listBicycleController).post(createBicycleController).all(methodNotAllowed);
router.route("/:id").get(getBicycleControllerById).put(updateBicycleController).patch(updateBicycleController).delete(deleteBicycleController).all(methodNotAllowed);

export default router;
