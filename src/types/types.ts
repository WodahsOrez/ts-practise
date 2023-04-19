/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 从T里面排除U里相同的属性后剩下的属性组成的类型
 */
export type OmitObject<T, U> = { [K in keyof Omit<T, keyof U>]: T[K] };

/**
 * 从T里面只获取索引类型为string的键
 */
export type StrKeyOf<T> = Extract<keyof T, string>;

/**
 * 构造函数接口，声明一个返回对象是T的构造函数，不传则返回类型是any
 */
export type Constructor<T extends object = any> = new (...args: any[]) => T;

/**
 * 声明一个构造函数，其构造函数参数用的是B的参数，返回类型是B的返回值类型和T类型的联合类型
 */
export type MixConstructor<B extends Constructor, T extends object> = new (
  ...args: ConstructorParameters<B>
) => T & InstanceType<B>;

/**
 * 替换数组的第一个元素的类型声明
 */
export type ReplaceFirstEl<T extends any[], E> = T extends [infer A, ...infer R] ? [E, ...R[]] : T;
