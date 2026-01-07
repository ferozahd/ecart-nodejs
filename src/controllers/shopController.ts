
import { Router, Request, Response } from "express";
import { asyncHandler } from '../utils/asyncHandler';
 import { createShop, getShops } from "../services/shopService";
import { ShopPostResource } from "../resources/shop/shop.post.resource";
const router = Router();


router.post('/shops', asyncHandler(async(req:Request<{},{},ShopPostResource>, res:Response)=>{
    const result =await createShop(req.body);
    res.status(201).json(result);
}));

router.get('/shops', async(req:Request, res:Response)=>{
    const result =await getShops();
    res.status(201).json(result);
});


export default router;
