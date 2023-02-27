import express from 'express';
import User from '../models/userModel.js';
import { isAuth, isAdmin, generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.description = req.body.sellerDescription || user.seller.description;
        user.seller.storeId = req.body.StoreId || user.seller.storeId;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: updatedUser.isSeller,
        token: generateToken(updatedUser),
        sellerName: updatedUser.seller.name,
        sellerDescription: updatedUser.seller.description,
        storeId: updatedUser.seller.storeId,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

userRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      user.isSeller = Boolean(req.body.isSeller);
      const updatedUser = await user.save();
      res.send({ message: 'User updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com' || user.email === 'tamlyn@super.admin') {
        res.status(400).send({ message: 'Can not delete admin user' });
        return;
      }
      await user.remove();
      res.send({ message: 'User deleted' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.post(
  '/login', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          storeId: user.storeId,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      // storeId: user.storeId,
    });
    const user = await newUser.save();
    if (user) {
      res.send({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        // storeId: user.storeId,
        token: generateToken(user),
      });
    }
    res.status(404).send({message: "Unable to create new user"})
  })
);



export default userRouter;