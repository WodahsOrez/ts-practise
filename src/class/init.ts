// JavaScript 按下列的初始化顺序执行：
// 基类的成员初始化
// 基类的构造函数初始化
// 子类的成员初始化
// 子类的构造函数初始化

class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}

class Derived extends Base {
  name = "derived";
}

// Prints "base", not "derived"
const d = new Derived();
