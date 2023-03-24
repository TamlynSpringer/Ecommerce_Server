import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import sourceRouter from './routes/sourceRoute.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import uploadRouter from './routes/uploadRoute.js';

dotenv.config();

mongoose
.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

const app = express(corsOptions);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).send({message: 'Server working. Go to /api/products'})
})
// app.use('/api/source', sourceRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Sever running on http://localhost:${port}`)
})