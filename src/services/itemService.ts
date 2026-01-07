import { ItemGetResource } from "../resources/item/item.get.resource";
import { ItemPatchResource } from "../resources/item/item.patch.resource";
import { ItemPostResource } from "../resources/item/item.post.resource";


export async function createItem(item:ItemPostResource):Promise<ItemGetResource>{

}

export async function getItems():Promise<ItemGetResource[]>{

}

export async function getAItemsById(id :string):Promise<ItemGetResource>{

}

export async function updateItem(id : string , payload : ItemPatchResource):Promise<ItemGetResource>{

}

export async function  deleteItem(id : string):Promise<void>{
  
}