// class语法里的get属性是不可枚举的，要想它可枚举，得换成以下a属性的写法

class A {
  /**
   * 注释
   *
   * @author lxm
   * @date 2022-10-12 11:10:59
   * @type {string}
   */
  declare a: string;

  b = 2;

  get c() {
    return "222";
  }

  constructor() {
    let _a: string = "2222";
    Object.defineProperty(this, "a", {
      get() {
        console.log("get");
        return _a;
      },
      set(val: string) {
        console.log("set");
        _a = val;
      },
      enumerable: true,
    });
  }
}

const ins = new A();
console.log(ins.a);
console.log(ins.b);
console.log(ins.c);
console.log(Object.keys(ins));

// 普通属性的描述符在实例上
console.log(Object.getOwnPropertyDescriptor(ins, "b")); // 有值
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ins), "b")); // undefined

// get属性的描述符在原型上
console.log(Object.getOwnPropertyDescriptor(ins, "c")); // undefined
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ins), "c")); // 有值
