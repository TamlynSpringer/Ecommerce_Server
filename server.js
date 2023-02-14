import express from 'express';
import data from './data.js';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';

const app = express();

app.use(cors(corsOptions));

app.get('/api/products', (req, res) => {
  res.send(data.products)
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Sever running on http://localhost:${port}`)
})