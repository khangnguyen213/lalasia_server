import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './routes/index';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

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
