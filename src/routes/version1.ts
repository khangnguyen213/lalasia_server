import express from 'express';
const router = express.Router();
import userModule from './modules/user.module';
import productModule from './modules/product.module';
import categoryModule from './modules/category.module';

router.use('/user', userModule);
router.use('/product', productModule);
router.use('/category', categoryModule);

export default router;
