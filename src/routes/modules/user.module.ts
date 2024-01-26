import express from 'express';
const router = express.Router();
import { trimInvalidBodyProps } from '../../middlewares/trimInvalidBodyProps';
import { userController } from '../../controllers/user.controller';

router.get('/', userController.listUser);
router.get('/:id', userController.getUserById);
router.patch(
  '/:id',
  trimInvalidBodyProps(['phone', 'first_name', 'last_name']),
  userController.updateUser
);
router.delete('/:id', userController.deleteUser);

router.post(
  '/register',
  trimInvalidBodyProps([
    'email',
    'password',
    'phone',
    'first_name',
    'last_name',
  ]),
  userController.createUser
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;
