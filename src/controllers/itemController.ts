
import { Router, Request, Response } from "express";
import {createItem,getItems,updateItem,deleteItem,getAItemsById} from '../services/itemService';
import { asyncHandler } from '../utils/asyncHandler';
import { ItemPostResource } from "../resources/item/item.post.resource";
const router = Router();


router.post('/items', asyncHandler(async(req:Request<{},{},ItemPostResource>, res:Response)=>{
    const result =await createItem(req.body);
    res.status(201).json(result);
}));

router.get('/items',  asyncHandler(async(req:Request, res:Response)=>{
    const result =await getItems();
    res.status(200).json(result);
}));

router.get('/items/:id',  asyncHandler(async(req:Request, res:Response)=>{
    const result =await getAItemsById("req");
    res.status(200).json(result);
}));


router.patch('/items/:id',  asyncHandler(async(req:Request<{},{},ItemPostResource>, res:Response)=>{
    const result =await updateItem("id",req.body);
    res.status(200).json(result);
}));


router.delete('/items/:id',  asyncHandler(async(req:Request, res:Response)=>{
    const result =await deleteItem("id");
    res.status(200);
}));

export default router;
