import { Router } from "express";
import { runValidation } from "../middleware/runValidation.js";

import {
  createProductValidation,
  updateProductValidation,
} from "../middleware/createProductValidation.js";

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";

const productRoutes = Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getSingleProduct);
productRoutes.post("/", createProductValidation, runValidation, createProduct);
productRoutes.put("/:id", updateProductValidation, runValidation,updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
