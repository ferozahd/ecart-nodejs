import ShopModel from "../entities/shop";
import { HttpError } from "../exceptions/httperror.exception";
import { ShopGetResource } from "../resources/shop/shop.get.resource";
import { ShopPostResource } from "../resources/shop/shop.post.resource";
import { getContextUserId } from "./userContextService";



export async function createShop(payload: ShopPostResource): Promise<ShopGetResource> {

    const userId =getContextUserId();
    if(!userId)
        throw new HttpError("expecting user id",401);

    const newShop = await ShopModel.create({ name: payload.name, ownerId: userId })
    return { id: newShop.id.toString(), name: newShop.name, ownerId: newShop.ownerId } as ShopGetResource;
}



export async function getShops(): Promise<ShopGetResource[]> {

    const shops = await ShopModel.find();

    return shops.map((shop) => {
        return {
            id: shop._id.toString(),
            name: shop.name,
            ownerId: shop.ownerId,
        };
    });
}


