// 参考官方文档 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

let a: any = { b: "2" };

Object.defineProperty(a, "property", {
  configurable: true, // 该属性后续是否还能被改变，默认false,
  enumerable: true, // 该属性能否被枚举，默认false。可枚举属性会被（for...in 或 Object.keys方法）遍历到
  // !value,writable与set,get互斥，不能同时使用。
  // value: 'xxx', // 默认值，默认undefined。
  // writable: true, // 是否可以被修改，默认为false，不允许被赋值运算符改变。
  // 属性的 getter 函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
  get() {
    console.log("获取值");
    return a.b;
  },
  // 属性的 setter 函数。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
  set(val) {
    console.log("设置值", val);
    a.b = val;
  },
});

console.log(a.property);
console.log((a.property = "3"));
