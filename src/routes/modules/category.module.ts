import { categoryController } from '../../controllers/category.controller';
import express from 'express';
import { trimInvalidBodyProps } from '../../middlewares/trimInvalidBodyProps';
const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOneWithProducts);
router.post(
  '/',
  trimInvalidBodyProps(['name', 'desc']),
  categoryController.create
);
router.patch(
  '/:id',
  trimInvalidBodyProps(['name', 'desc']),
  categoryController.update
);
router.delete('/:id', categoryController.delete);

export default router;
