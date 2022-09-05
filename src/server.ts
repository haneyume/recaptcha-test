import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', (req, res) => {
  res.send('Hello World!');
});

app.use(express.static('public'));

const port = Number(process.env.PORT || 8080);
const server = app.listen(port, () => {
  console.log(new Date(), `🚀 Server is running on port ${port}`);
});
