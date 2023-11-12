import fs from "fs/promises";
import { errorResponse, successResponse } from "./responseControler.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const maxPrice = req.query.maxPrice;
    let filterProduct;

    if (maxPrice) {
      filterProduct = products.filter((product) => product.price <= maxPrice);
      successResponse(
        res,
        200,
        "products are returned based on max price",
        filterProduct
      );
    } else {
      successResponse(res, 200, "all the products are returned", products);
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));

    const id = req.params.id;

    const product = products.find((product) => product.id === id);

    if (!product) {
      errorResponse(res, 404, `product not found with this ID ${id}`);
      return;
    }
    successResponse(res, 200, "single product is returned", product);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    let { title, price } = req.body;

    const newProduct = {
      id: new Date().getTime().toString(),
      title: title,
      price: price,
    };
    const existingProducts = JSON.parse(
      await fs.readFile("products.json", "utf-8")
    );
    existingProducts.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(existingProducts));
    successResponse(res, 200, "product is add");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));

    const id = req.params.id;
    const { title, price } = req.body;

    const index = products.findIndex((product) => product.id === id);

    if (index < 0) {
      errorResponse(res, 404, `product not found with this ID ${id}`);
      return;
    }
    if (title) {
      products[index].title = title ?? products[index].title;
    }
    if (price) {
      products[index].price = price ?? products[index].price;
    }

    await fs.writeFile("products.json", JSON.stringify(products));
    successResponse(res, 200, "single product is updated", products[index]);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const product = products.findIndex((product) => product.id === id);

    if (product !== -1) {
      products.splice(product, 1);
      await fs.writeFile("products.json", JSON.stringify(products));
      successResponse(res, 200, "single product is deleted");
    } else {
      errorResponse(res, 404, `product not found with this ID ${id}`);
      return;
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
