import { hasOwn } from '@vue/shared'
import { Target, ReactiveFlags } from './reactive';
/* handler trap处理start  */
function createGetter(isRedonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object){
    if(key === ReactiveFlags.IS_REACTIVE){
        return !isRedonly;
    }else if(key === ReactiveFlags.IS_READONLY){
        return isRedonly;
    }else if(key === ReactiveFlags.IS_SHALLOW){
        return shallow
    }

  }
}
function deleteProperty(target: object, key: string | symbol): boolean {
    const hadKey = hasOwn(target, key);
    const oldVal = target[key];
    const result = Reflect.deleteProperty(target, key);
    if(result && hadKey){
        // 处理依赖收集 todo
    }

    return result;
}

function has(target: object, key: string | symbol): boolean {
    const result = Reflect.has(target, key);
    return result;
}
function ownKeys(target: object): (string | symbol)[] {
    return Reflect.ownKeys(target);
}
/* handler trap处理end  */

// reactive handlers
export const mutableHandlers = {

}