console.log('c.mjs:start')
import { B } from './b.mjs'
// export { B } from './b.mjs'
// export { A } from './a.mjs'
import { A } from './a.mjs'

export { B, A }
console.log('c.mjs:end')
