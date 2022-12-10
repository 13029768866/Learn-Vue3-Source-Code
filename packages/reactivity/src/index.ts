import { isObject } from "@vue/shared";

// 对象代理映射
const proxyMap = new WeakMap();

// 所有响应式标识(以__v_开头)
export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
}

export function reactive(target) {
    // reactive基于proxy代理对象,proxy的target必须是一个对象
    if(!isObject(target)) return target;

    /* 一、解决同一个对象重复代理 */
    const existingProxy = proxyMap.get(target);
    if(existingProxy) return existingProxy;

    /* 二、解决同一对象代理后,继续代理 */
    if(target[ReactiveFlags.IS_REACTIVE]) return target;

    // 代理对象,并处理handler逻辑
    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            if(key === ReactiveFlags.IS_REACTIVE) return true;
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            return Reflect.set(target, key, value, receiver)
        },
    })

    proxy.set(target, proxy);
    return proxy;
}