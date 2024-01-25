import express from 'express';
const router = express.Router();
import { userController } from '../../controllers/user.controller';

router.get('/', userController.listUser);
router.post('/', userController.createUser);

export default router;
