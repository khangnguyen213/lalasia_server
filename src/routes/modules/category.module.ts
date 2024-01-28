import { categoryController } from '../../controllers/category.controller';
import express from 'express';
import { trimInvalidBodyProps } from '../../middlewares/trimInvalidBodyProps';
const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOneWithProducts);
router.post(
  '/',
  trimInvalidBodyProps(['name', 'id']),
  categoryController.create
);
router.patch(
  '/:id',
  trimInvalidBodyProps(['name', 'id']),
  categoryController.update
);

router.put(
  '/:categoryId',
  trimInvalidBodyProps(['productId']),
  categoryController.addProductToCategory
);

router.delete('/:id', categoryController.delete);

export default router;
