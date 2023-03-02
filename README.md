# Baltic Store API

A MERN stack (MongoDB, ExpressJS, React, Node) multi-vendor eCommerce site

Intended to work similarly to Amazon.com

Authentication and authorization set up with three roles - user, seller and admin.
Users can browse the store, create an account, add items to their cart and process an order.
Sellers can create a store profile, add and edit products.
Admin can add, edit and delete products, as well as edit (change role) and delete users.


## Technologies

- MongoDB
- Mongoose
- ExpressJS
- NodeJS
- JSON web tokens (JWT)
- Bcrypt
- Cloudinary (image hosting)

## Hosted site

Front-end:
https://baltic-store.netlify.app/

Back-end:
https://baltic-store-api.cyclic.app/

### End-points
Can be tested in Postman (GET, POST, PUT, DELETE) or in the browser (GET)

#### GET requests
- /api/source
  Initial products and users that populated the database, including the 'super-admin'
  
- /api/products
  Access all products
- /api/products/search
  Search products by query
- /api/products/categories
  Filter products by category
- /api/products/admin
  View of all products in a table, with the option to edit (PUT) and delete (DELETE) products
- /api/products/sku/:sku
  Find one product by its SKU 
- /api/products/:id
  Find one product by its ID 

- /api/seller/:id
  Find seller by ID for the store page
- /api/:id
  Find any user by ID, irrelevent of role

### PUT requests

...
