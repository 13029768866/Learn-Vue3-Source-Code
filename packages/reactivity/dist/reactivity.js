// packages/shared/src/index.ts
var isObject = (value) => {
  return value !== null && typeof value === "object";
};

// packages/reactivity/src/reactive.ts
var proxyMap = /* @__PURE__ */ new WeakMap();
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2["IS_REACTIVE"] = "__v_isReactive";
  return ReactiveFlags2;
})(ReactiveFlags || {});
function reactive(target) {
  if (!isObject(target))
    return target;
  const existingProxy = proxyMap.get(target);
  if (existingProxy)
    return existingProxy;
  if (target["__v_isReactive" /* IS_REACTIVE */])
    return target;
  const proxy = new Proxy(target, {
    get(target2, key, receiver) {
      if (key === "__v_isReactive" /* IS_REACTIVE */)
        return true;
      return Reflect.get(target2, key, receiver);
    },
    set(target2, key, value, receiver) {
      return Reflect.set(target2, key, value, receiver);
    }
  });
  proxyMap.set(target, proxy);
  return proxy;
}
export {
  ReactiveFlags,
  reactive
};
//# sourceMappingURL=reactivity.js.map
