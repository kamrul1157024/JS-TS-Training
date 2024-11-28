// What is Iterator return object which contain a function
// named next which will return following
// { value: <SOME_VALUE>, done: TRUE OR FALSE }
//
//nth Fib = N-1 th Fib + N-2 th Fib
//

const myIterableObj = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next() {
        return { value: count++, done: Boolean(count > 10) };
      },
    };
  },
};

for (const val of myIterableObj) {
  console.log(val);
}

// Generating Iterator
function getFibIterator(n = 10) {
  let N_1thFib = 0,
    N_2thFib = 1,
    count = 0;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          const NthFib = N_1thFib + N_2thFib;
          N_2thFib = N_1thFib;
          N_1thFib = NthFib;
          count++;
          return { value: NthFib, done: Boolean(count == n) };
        },
      };
    },
  };
}

const fibIterator = getFibIterator(1);

for (const val of fibIterator) {
  console.log(val);
}

// Generator Example
function* fooGenerator() {
  yield "a";
  yield "b";
  yield "c";
}

const foo = fooGenerator();

console.log("Test Symbol Iterator" + foo[Symbol.iterator] === foo);

console.log(foo.next());
console.log(foo.next());
console.log(foo.next());
console.log(foo.next());

// Iterating over fooGenerator
let str = "Test: ";
for (const val of fooGenerator()) {
  str = str + val;
}

console.log(str);
//Generator with return statement
function* testGen() {
  yield 1;
  yield 2;
  return 3;
}

const testItr = testGen();

for (const val of testGen()) {
  console.log("Test gen with Iterator:", val);
}

// Infinite generator

function* infinite() {
  let index = 0;

  while (true) {
    yield index++;
  }
}

const generator = infinite();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);

// User Defined Iterator
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const value of myIterable) {
  console.log(value);
}

console.log([...myIterable]);

// Fibonacci Iterator using generator
function* fibGenerator(n = 10) {
  let N_1thFib = 0,
    N_2thFib = 1,
    count = 0;
  if (count <= n) {
    const NthFib = N_1thFib + N_2thFib;
    N_2thFib = N_1thFib;
    N_1thFib = NthFib;
    count++;
    yield NthFib;
  }
}

const fibItr = getFibIterator(10);

for (const val of fibItr) {
  console.log(val);
}

//Delegating to another generator
function* g1() {
  yield 2;
  yield 3;
  yield 4;
}

function* g2() {
  yield 1;
  yield* g1();
  yield 5;
}

const itrFromG2 = g2();

for (const val of itrFromG2) {
  console.log(val);
}


//Async iterator
async function* foo() {
  yield await Promise.resolve('a');
  yield await Promise.resolve('b');
  yield await Promise.resolve('c');
}

let testStr = '';

async function generate() {
  for await (const val of foo()) {
    testStr = testStr + val;
  }
  console.log(testStr);
}

generate();


// Work write a async iterator to iterate over paginated response in for loop
// https://dummyjson.com/docs/posts#posts-limit_skip



