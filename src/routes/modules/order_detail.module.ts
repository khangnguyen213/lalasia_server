import express from 'express';
import { orderDetailController } from '../../controllers/order_detail.controller';
import { trimInvalidBodyProps } from '../../middlewares/trimInvalidBodyProps';

const router = express.Router();

router.post(
  '/',
  trimInvalidBodyProps(['addressId']),
  orderDetailController.addOrderDetail
);
router.get('/', orderDetailController.getOrderDetail);

export default router;
