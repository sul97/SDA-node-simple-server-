import { Router } from "express";
import { getAllUsers } from "../controllers/usersControllers.js";

const usersRoutes = Router();

usersRoutes.get("/", getAllUsers);

export default usersRoutes;
