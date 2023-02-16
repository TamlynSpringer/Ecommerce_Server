import express from 'express';
import data from './data.js';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

const app = express();

app.use(cors(corsOptions));

app.get('/api/products', (req, res) => {
  res.send(data.products)
});

app.get(`/api/products/slug/:slug`, (req, res) => {
  const product = data.products.find(prod => prod.slug === req.params.slug);
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(prod => prod._id === req.params.id);
  console.log(product)
  console.log(req.params.id)
  if (!product) {
    res.status(404).send({ message: `Product with id ${req.params.id} not found` })
  } res.status(200).send(product)
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Sever running on http://localhost:${port}`)
})