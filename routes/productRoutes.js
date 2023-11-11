import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";

const productRoutes = Router();

productRoutes.get("/products", getAllProducts);
productRoutes.get("/products/:id", getSingleProduct);
productRoutes.post("/products", createProduct);
productRoutes.put("/products/:id", updateProduct);
productRoutes.delete("/products/:id", deleteProduct);

export default productRoutes;
