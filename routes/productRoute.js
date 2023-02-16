import express from 'express'
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get(`/slug/:slug`, async (req, res) => {
  const product = await Product.findOne({slug: req.params.slug});
  if (!product) {
    res.status(404).send({ message: 'Product not found' })   
  } res.send(product)
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send({ message: `Product with id ${req.params.id} not found` })
  } res.status(200).send(product)
});

export default productRouter;
