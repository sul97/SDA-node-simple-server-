import http from 'http';
import fs from 'fs/promises';
import { parse } from 'querystring';

const PORT = '8080'

const errorHandler = (res, statusCode, message) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end()
}

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  /* handle http requests */
  if (req.method === 'GET' && req.url === '/') {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Hello World!!</h1>');
      res.end()
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }

  } else if ((req.method === 'POST' && req.url === '/')) { 
    try{
      let body = "";
        req.on('data', (data) => {
          body = body + data;
        });
        req.on('end',()=>{
          console.log('Received Data :',body);
          res.writeHead(201,{'Content-Type':'text/plain'});
          res.write('Data received');
          res.end();
        });
    } catch{

    }
  }
    
    //all products
  else if (req.method === 'GET' && req.url === '/products') {
    try {
      const products=JSON.parse(await fs.readFile('products.json', 'utf-8'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(products));
      res.end()
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }
  }
    
  //single product
  else if (req.method === 'GET' && req.url.match(/\/products\/([0-9]+)/)) {
    try {
      const products=JSON.parse(await fs.readFile('products.json', 'utf-8'));
      const id = req.url?.split('/')[2]
      const product = products.find((product) => product.id === id)
      
      if (!product) {
        errorHandler(res, 404, `product not found with this ID ${id}`);
        return;
      }
     
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(product));
      res.end()
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }
  }
    
  //create product
  else if (req.method === 'POST' && req.url === '/products') {
     try {
      let body = '';

        req.on('data', (chunk) => {
          body = body + chunk;
          console.log(body)
        });
        req.on('end', async() => {
          const data = parse(body);
          const newProduct = {
            id: new Date().getTime().toString(),
            title: data.title,
            price: data.price,
          };
          const existingProducts =JSON.parse(await fs.readFile('products.json', 'utf-8'));
          existingProducts.push(newProduct)
          await fs.writeFile('products.json', JSON.stringify(existingProducts));
          res.writeHead(201, { 'Content-Type': 'text/plain' });
          res.write('Product is Created');
          res.end()
        });
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }
  }
    
  //delete product
  else if (req.method === 'DELETE' && req.url.match(/\/products\/([0-9]+)/)) {
    try {
      const products=JSON.parse(await fs.readFile('products.json', 'utf-8'));
      const id = req.url?.split('/')[2]
      const product = products.findIndex((product) => product.id === id)
     
      if (product !== -1) {
      products.splice(product, 1);
      await fs.writeFile('products.json', JSON.stringify(products));

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Product is deleted');
      res.end();
      } else {
      errorHandler(res, 404, `Product not found with ID ${id}`);
      return;
    }
      
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }
  }
  else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Route not found');
      res.end()
  }
})
  
server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  });

