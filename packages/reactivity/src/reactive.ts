import { isObject } from "@vue/shared";

// 对象代理映射
const proxyMap = new WeakMap();

// 所有响应式标识(以__v_开头)
export const enum ReactiveFlags {
    SKIP = '__v_skip',               // 跳过标识
    IS_REACTIVE = '__v_isReactive',  // 响应式标识
    IS_READONLY = '__v_isReadonly',  // 只读标识
    IS_SHALLOW = '__v_isShallow',    // 浅层标识
    RAW = '__v_raw'                  // 原始标识
}
export interface Target {
    [ReactiveFlags.SKIP]?: boolean
    [ReactiveFlags.IS_REACTIVE]?: boolean
    [ReactiveFlags.IS_READONLY]?: boolean
    [ReactiveFlags.IS_SHALLOW]?: boolean
    [ReactiveFlags.RAW]?: any
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

    proxyMap.set(target, proxy);
    return proxy;
}

export function createRactiveObject(
    target: Target,
    isRedonly: boolean,
    baseHandlers: ProxyHandler<any>,
    collectionHandlers: ProxyHandler<any>,
    proxyMap: WeakMap<Target, any>
) {

}

/* 标识属性判断方法start */
export function isRedonly(value: unknown): boolean {
    return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}
export function isShallow(value: unknown):boolean {
    return !!(value && (value as Target)[ReactiveFlags.IS_SHALLOW])
}
/* 类型判断方法end */