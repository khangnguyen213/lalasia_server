import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './routes/index';
import session from 'express-session';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
    },
  })
);

server.use('/api', api);

server.get('/', (req, res) => {
  res.send('Connected');
});

server.listen(
  process.env.ENV == 'dev' ? process.env.PORT_DEV : process.env.PORT_PRO,
  () => {
    console.log(
      `Server on at:  ${process.env.PROTOCOL_TYPE}://${
        process.env.ENV == 'dev' ? process.env.HOST_DEV : process.env.HOST_PRO
      }:${
        process.env.ENV == 'dev' ? process.env.PORT_DEV : process.env.PORT_PRO
      }`
    );
  }
);
