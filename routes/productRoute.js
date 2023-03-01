import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAuth, isAdmin, isSeller, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const products = await Product.find({ ...sellerFilter }).populate('seller', 'seller.name');
    res.send(products);
});

productRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: 'name ' + Date.now(),
      seller: req.user._id,
      slug: 'slug-' + Date.now(),
      image: 'http://dummyimage.com/300x400.png/808080/ffffff',
      price: 0,
      category: 'eg',
      brand: 'eg',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'description',
    });
    const product = await newProduct.save();
    res.send({ message: 'Product created', product });
  })
);

//update product - ProductEditPage
productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: 'Product updated' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: 'Product deleted' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  })
);

const PAGE_SIZE = 5;

productRouter.get(
  '/admin',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const seller = req.query.seller || '';
    console.log(seller)
    const sellerFilter = seller ? { seller } : {};

    const products = await Product.find({ ...sellerFilter })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    const countProducts = await Product.countDocuments();

    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize),
    });
})
);

productRouter.get(`/slug/:slug`, async (req, res) => {
  const product = await Product.findOne({slug: req.params.slug}).populate('seller', 'seller.name seller.description');
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
