import { AsyncLocalStorage } from 'node:async_hooks';
import { UserContextResource } from '../resources/user-context/user.context.resource';
 
export const userContext = new AsyncLocalStorage<UserContextResource>();

export function getContextUserName():string|undefined{
    return userContext.getStore()?.name;
}

export function getContextUserRole():string|undefined{
    return userContext.getStore()?.role;
}

export function getContextUserEmail():string|undefined{
    return userContext.getStore()?.email;
}

export function getContextUserId():string|undefined{
    return userContext.getStore()?.userId;
}