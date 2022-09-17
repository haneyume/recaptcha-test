import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/submit', async (req, res) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const token = req.body.token;

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    },
  );

  console.log(response.data);

  res.json({ data: response.data });
});

app.use(express.static('public'));

const port = Number(process.env.PORT || 8080);
const server = app.listen(port, () => {
  console.log(new Date(), `🚀 Server is running on port ${port}`);
});
