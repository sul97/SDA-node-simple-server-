import { Router } from "express";
import { getAllUsers } from "../controllers/usersControllers.js";
import { isLoggedIn, isAdnim } from "../middleware/userValidation.js";

const usersRoutes = Router();

usersRoutes.get("/", isLoggedIn, isAdnim, getAllUsers);

export default usersRoutes;
