console.log("b.mjs:start");
import { A } from "./c.mjs";

export class B extends D {
  constructor() {
    console.log("A: ", A);
  }
}

const B = {};

console.log("b.mjs:end");
