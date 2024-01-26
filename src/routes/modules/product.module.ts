import express from 'express';
const router = express.Router();
import { trimInvalidBodyProps } from '../../middlewares/trimInvalidBodyProps';
import { productController } from '../../controllers/product.controller';

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.post(
  '/',
  trimInvalidBodyProps([
    'name',
    'desc',
    'price',
    'quantity',
    'categories',
    'images',
  ]),
  productController.create
);
router.patch(
  '/:id',
  trimInvalidBodyProps([
    'name',
    'desc',
    'price',
    'quantity',
    'categories',
    'images',
  ]),
  productController.update
);
router.delete('/:id', productController.delete);

export default router;
