// Basic Typing

let x = 0;
let xStr: string = "some str";

function doSomething(a: string, b: string) {
  return a + b;
}

function testLiteral(x: "left" | "right") {
  return x;
}

testLiteral("left");

type UserInfo = {
  name: string;
  age: number;
  setName: (name: string) => void;
  getName: () => string;
};

function print(userInfo: UserInfo) {
  return userInfo.getName();
}

const userInfo = {
  name: "test",
  age: 20,
  setName: function (name: string) {
    this.name = name;
  },
  getName: function () {
    return this.name;
  },
};

print(userInfo);

interface IUserInfo {
  name: string;
  age: number;
  setName: (name: string) => void;
  getName: () => string;
}

class CUserInfo implements IUserInfo {
  name: string;
  age: number;
  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

function iPrint(userInfo: IUserInfo) {
  return userInfo.getName();
}

iPrint(userInfo);

const cUserInfo = new CUserInfo();

iPrint(cUserInfo);

// interface vs Types?
// When to use what?
// use interface only when you use type

interface UserInfoMixin {
  setName: (name: string) => void;
  getName: () => string;
}

interface OUserInfo extends UserInfoMixin {
  name: string;
  age: number;
}

class COUserInfo implements UserInfo, UserInfoMixin {
  name: string;
  age: number;
  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

type UserInfoMethods = {
  setName: (name: string) => void;
  getName: () => string;
};

type UserInfoData = {
  name: string;
  age: number;
};

type UserInfoType = UserInfoMethods & UserInfoData;

class CTUserInfo implements UserInfoType {
  name: string;
  age: number;
  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

type A = { a: string; b: string };
type B = { a: number; b: { c: string; d: string } };

type C = A & B;

// const objC: C = {
//   b: 's',
// }

type Dog = { age: number; woof: Function };
type Cat = { age: number; meow: Function };

// Type weird is an intersection of cat and dog
// it needs to have all properties of them combined
type Weird = Dog & Cat;

const weirdAnimal: Weird = {
  age: 2,
  woof: () => {
    "woof";
  },
  meow: () => {
    "meow";
  },
};

function getMeAnimal(animal: Dog | Cat) {
  return animal;
}

const dog: Dog = {
  age: 2,
  woof: () => "woof",
};

const cat: Cat = {
  age: 2,
  meow: () => "meow",
};

getMeAnimal(dog);
getMeAnimal(cat);
getMeAnimal(weirdAnimal); // TS only cares about it required items are present or not

// Generics

function callApa<T extends number | string>(a: T) {
  console.log(a);
  return a;
}

callApa("a");
callApa(2);

class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

interface Producer<T> {
  make(): T;
}

interface IAnimalProducer {
  make(): Animal;
}

class AnimalProducer implements IAnimalProducer {
  constructor() {}
  make(): Animal {
    return { numLegs: 10 };
  }
}

function produce<T>(producer: Producer<T>) {
  return producer.make();
}

produce(new AnimalProducer());

type Content<DT extends string | number> = { data: DT };

const dt1: Content<string> = { data: "test" };
const dt2: Content<number> = { data: 3 };

//Helper Types

type Order = {
  productId: number;
  productName: string;
  customerId: number;
  price: number;
  metaData: {
    expiryDate: Date;
    stockDate: Date;
  };
};

type OrderKeys = keyof Order;

function printMetadata(order: Pick<Order, "metaData" | "productId">) {
  console.log(order.productId, order.metaData);
}

printMetadata({
  productId: 3,
  metaData: {
    expiryDate: new Date(),
    stockDate: new Date(),
  },
});

function getProductInfo(order: Omit<Order, "customerId" | "metaData">) {
  return {
    productId: order.productId,
    productName: order.productName,
  };
}

getProductInfo({
  productId: 12,
  productName: "Apple",
  price: 10,
});

type Birds = "Duck" | "Magpie" | "Owl" | "Sparrow" | "Ostrich";

function printBirdsThatCanFly(bird: Exclude<Birds, "Duck" | "Ostrich">) {
  console.log(bird);
}

printBirdsThatCanFly("Owl");

function printProductInfo(productInfo: ReturnType<typeof getProductInfo>) {
  console.log(productInfo);
}

printProductInfo(
  getProductInfo({
    productId: 12,
    productName: "Apple",
    price: 10,
  }),
);

type InheritedLeader<Name extends "Hasina" | "Khaleda"> = Name extends "Hasina"
  ? { age: number; tellSojonHaranorBedona: () => string }
  : { age: number; threatGopali: () => string };

const hasina: InheritedLeader<"Hasina"> = {
  age: 77,
  tellSojonHaranorBedona: () =>
    "Sojon haranor bedona niye beche asi, jani kosto kemon hoy",
};

const khaleda: InheritedLeader<"Khaleda"> = {
  age: 79,
  threatGopali: () =>
    "Apnader officer kothay? Etokkhon to onek kotha bolesen... mukhta bondho keno ekhon? Gopalganjer jeler nam-i bodle jabe.",
};

// Inferring types

async function getProductInfoAsync(
  order: Omit<Order, "customerId" | "metaData">,
) {
  return {
    productId: order.productId,
    productName: order.productName,
  };
}

type DePromisify<T extends Promise<any>> =
  T extends Promise<infer U> ? U : never;

type ProductInfoReturnPromise = ReturnType<typeof getProductInfoAsync>;

type ProductInfoReturn = DePromisify<ProductInfoReturnPromise>;

type FirstArgumentOfFunction<T extends (...args: any[]) => any> = T extends (
  arg1: infer U,
  ...args: any[]
) => any
  ? U
  : never;

function fnE(a: number, b: string) {
  return a + b;
}
function fnO(arg: { a: number; b: string }) {
  return arg.a + arg.b;
}

type firstArgFnE = FirstArgumentOfFunction<typeof fnE>;
type firstArgFnO = FirstArgumentOfFunction<typeof fnO>;

type MyPick<P extends { [key: string]: any }, Q extends keyof P> = {
  [key in Q]: P[key];
};

function printMetadataM(order: MyPick<Order, "metaData" | "productId">) {
  console.log(order.productId, order.metaData);
}

printMetadata({
  productId: 3,
  metaData: {
    expiryDate: new Date(),
    stockDate: new Date(),
  },
});

type ValueOf<T> = T[keyof T];

const productInfo = {
  productId: 3,
  productName: 'apple',
  metaData: {
    expiryDate: new Date(),
    stockDate: new Date(),
  },
} as const;

type ValeOfProductInfo = ValueOf<typeof productInfo>

