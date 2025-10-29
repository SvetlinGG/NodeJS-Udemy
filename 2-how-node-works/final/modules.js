console.log(arguments);
console.log(require('module').wrapper);

const C = require('./test-module-1');
const calc1 = new C();

console.log(calc1.add(2, 3));
console.log(calc1.multiply(2, 3));
console.log(calc1.divide(2, 3));



