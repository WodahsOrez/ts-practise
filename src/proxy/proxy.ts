/* eslint-disable max-classes-per-file */
/* eslint-disable no-constructor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReplaceFirstEl } from "../types/types";

/**
 * 是否使用Proxy来实现。
 */
const useProxy = false;

/**
 * 获取所有属性keys,包括原型上的，不可枚举的和symbol的
 * @author lxm
 * @date 2023-04-16 07:07:45
 * @param {*} obj
 * @return {*}  {((string | symbol)[])}
 */
export function getAllKeys(obj: any): (string | symbol)[] {
  const ownKeys = Reflect.ownKeys(obj);
  const proto = Reflect.getPrototypeOf(obj);
  if (proto) {
    const protoKeys = getAllKeys(proto);
    return Array.from(new Set(ownKeys.concat(protoKeys)));
  }
  return ownKeys;
}

/**
 * 代理传入参数的所有属性和方法，自身的继承链可以覆盖这些方法。
 * @author lxm
 * @date 2023-04-17 09:24:56
 * @export
 * @class SourceProxy
 */
export class SourceProxy {
  /**
   * 代理的源对象，仅限内部使用
   * @author lxm
   * @date 2023-04-17 11:08:32
   * @protected
   * @type {T}
   */
  protected declare readonly source: unknown;

  /**
   * 在构造函数里代理source的所有属性和方法
   * @author lxm
   * @date 2023-04-17 01:59:33
   * @param {T} source 代理的源对象
   */
  constructor(source: unknown) {
    // 禁止source属性可枚举
    Object.defineProperty(this, "source", {
      enumerable: false,
      value: source,
    });

    if (!useProxy) {
      const allKeys = getAllKeys(source);
      console.log("allkeys", allKeys);
      for (const key of allKeys) {
        // 原型上已经有的方法不会覆盖，构造函数里赋值的属性和方法会先赋值一遍，子类constructor体里面再覆盖。
        if (!(key in this)) {
          console.log(`补充key${String(key)}`);
          (this as any)[key] = (source as any)[key];
        }
      }
    } else {
      // 通过proxy代理，自身没有定义时从source里去拿
      return new Proxy(this, {
        get(target, p, receiver) {
          return p in target
            ? Reflect.get(target, p, receiver)
            : Reflect.get(source as any, p, receiver);
        },
      });
    }
  }
}

/**
 * 自动调整protected source的类型声明
 * @author lxm
 * @date 2023-04-17 10:29:33
 * @class ProtectedSource
 * @template T
 */
export class ProtectedSource<T> extends SourceProxy {
  /**
   * 代理的源对象，仅限内部使用
   * @author lxm
   * @date 2023-04-17 12:35:19
   * @protected
   * @type {T}
   */
  protected declare readonly source: T;
}

/**
 * 继承base类型，并且告诉TS已经实现了所有K类型的接口。
 * @author lxm
 * @date 2023-04-17 10:19:41
 * @template K 实现的接口类型
 * @template T 继承的class类型的构造函数声明
 * @param {T} base 继承的class类型
 * @param {K} [_i] 实现的接口声明实例（假的，只是为了自动推导类型）
 * @return {*}
 */
export function proxyExtends<K extends object, T extends typeof SourceProxy = typeof SourceProxy>(
  base: T,
  _i?: K
) {
  const baseClass = base || SourceProxy;
  // return base as unknown as MixConstructor<typeof ModelObject, K>;
  return baseClass as unknown as new (...args: ReplaceFirstEl<ConstructorParameters<T>, K>) => K &
    ProtectedSource<K> &
    Omit<InstanceType<T>, "source">;
}
