import express from 'express';
const router = express.Router();
import userModule from './modules/user.module';
import productModule from './modules/product.module';
import categoryModule from './modules/category.module';
import shoppingSessionModule from './modules/shopping_session.module';
import orderDetailModule from './modules/order_detail.module';

router.use('/user', userModule);
router.use('/product', productModule);
router.use('/category', categoryModule);
router.use('/shopping-session', shoppingSessionModule);
router.use('/order-detail', orderDetailModule);

export default router;
