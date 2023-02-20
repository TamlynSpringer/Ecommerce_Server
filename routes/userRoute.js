import express from 'express';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post(
  '/login', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          brand: user.brand,
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
      brand: req.body.brand
    });
    const user = await newUser.save();
    if (user) {
      res.send({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        brand: user.brand,
        token: generateToken(user),
      });
    }
    res.status(404).send({message: "Unable to create new user"})
  })
);

export default userRouter;