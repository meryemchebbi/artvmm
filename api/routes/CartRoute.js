import express from 'express';
import { addToCart, getCart, removeFromCart,updateQuantity,getCartById } from '../controllers/CartController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add', verifyToken, addToCart);
router.get('/get', verifyToken, getCart);
router.delete('/:cartId', removeFromCart);
router.patch('/:cartId', updateQuantity);
router.get('/:cartId', getCartById);


export default router;