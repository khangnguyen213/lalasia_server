import express from 'express';
const router = express.Router();
import version1 from './version1';

router.use('/v1', version1);
export default router;
