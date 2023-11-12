import fs from "fs/promises";
import { errorResponse, successResponse } from "./responseControler.js";

export const getAllUsers = async (req, res) => {
  try {
    
    const products = JSON.parse(await fs.readFile("users.json", "utf-8"));
    successResponse(res, 200, "all the users are returned", products);
  
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
