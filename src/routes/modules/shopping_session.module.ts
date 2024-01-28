import express from 'express';
import { shoppingSessionController } from '../../controllers/shopping_session.controller';
import { trimInvalidBodyProps } from '../../middlewares/trimInvalidBodyProps';

const router = express.Router();

router.post(
  '/',
  trimInvalidBodyProps(['productId', 'quantity']),
  shoppingSessionController.addOrUpdateItemToShoppingSession
);
router.get('/', shoppingSessionController.getShoppingSession);
router.delete('/:sessionItemId', shoppingSessionController.deleteSessionItem);
router.delete('/', shoppingSessionController.deleteShoppingSession);

export default router;
