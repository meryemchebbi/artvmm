import express from 'express';
import { createCommande, getCommandes,getCardByIds } from '../controllers/CommandController.js';

const router = express.Router();

router.post('/create', createCommande);
router.get('/get', getCommandes);
router.get('/getByIds/:cartId', getCardByIds);


export default router;