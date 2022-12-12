export const isObject = (value) => value !== null && typeof value === 'object';

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
    target: object,
    key: string | symbol
): key is keyof typeof target => hasOwnProperty.call(target, key);



