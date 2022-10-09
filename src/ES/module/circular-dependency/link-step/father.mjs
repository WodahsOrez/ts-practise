const father = {};
console.log("father执行阶段start");
// const father = {}; // import之前的声明先执行，当前模块的声明在当前最开始就做好了。
import { son } from "./son.mjs";

export class A extends B {} // 变量声明比类extends先执行
const father = {}; // 故意报错，看子模块哪个先触发

// export const father = {}; // export变量和普通变量是一样的按顺序声明

console.log("father执行阶段end");
