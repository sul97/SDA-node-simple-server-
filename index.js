import http from 'http';

const PORT = '8080'

let products = [
  { id: '1', title: 'apple iphone 15', price: 4000 },
  { id: '2', title: 'apple iphone 14', price: 3500 },
  { id: '3', title: 'apple iphone 13', price: 3000 } 
]

const errorHandler = (res, statusCode, message) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end()
}

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  /* handle http requests */
  if (req.method === 'GET' && req.url === '/') {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Hello World</h1>');
      res.end()
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }

  } else if ((req.method === 'POST' && req.url === '/')) { }
    
    
  else if (req.method === 'GET' && req.url === '/products') {
    try {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(products));
      res.end()
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }
  }
    
  else if (req.method === 'GET' && req.url.match(/\/products\/([0-9]+)/)) {
    try {
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
    
  else if (req.method === 'POST' && req.url === '/products') {
     try {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Product is Created');
      res.end()
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }
  }
    
  else if (req.method === 'PUT' && req.url.match(/\/products\/([0-9]+)/)) {
    try {
      const id = req.url?.split('/')[2]
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Product is Updated');
      res.end()
    } catch (error) {
      errorHandler(res, 500, 'Server Error');
    }
  }
    
  else if (req.method === 'DELETE' && req.url.match(/\/products\/([0-9]+)/)) {
    try {
      const id = req.url?.split('/')[2]
      const product = products.findIndex((product) => product.id === id)

      if (product !== -1) {
      products.splice(product, 1);

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

