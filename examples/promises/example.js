// Basic Example of data fetching
async function getMeData() {
  const response = await fetch("https://dummyjson.com/http/200");
  const json = await response.json();
  return json;
}

async function printData() {
  const data = await getMeData();
  console.log(data);
}

console.log(printData());

// Then chaining
getMeData()
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log(" I am going to execute whatever happens"));

// Promise Variable
async function testPromiseVariable() {
  const promisedA = Promise.resolve("a");
  const promisedB = Promise.reject("b");

  console.log("promisedA:", promisedA);
  console.log("promisedB:", promisedB);

  console.log("resolvedA:", await promisedA);
  try {
    console.log("rejectedB:", await promisedB);
  } catch (e) {
    console.log("I a Rejected Promise", e);
  }
}

testPromiseVariable();

async function testPromiseVariable() {
  const promisedA = Promise.resolve("a");
  const promisedB = Promise.reject("b");

  console.log("promisedA:", promisedA);
  console.log("promisedB:", promisedB);

  await promisedA;
  console.log("resolvedA:", promisedA);
  try {
    await promisedB;
    console.log("rejectedB:", promisedB);
  } catch (e) {
    console.log("I a Rejected Promise", e);
  }
}

testPromiseVariable();

// Sleep for 10s
async function sleep(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return reject("Mone chaise tai reject!");
      }
      return resolve("Sojon Haranor bedona");
    }, x);
  });
}

async function doSomething() {
  console.log("I will do it tomorrow");
  sleep(10);
  console.log("Nah, I will do it tomorrow");
  // doSomething();
}

doSomething();

// callback pattern
// you have to call the function err or data

function fetchData(callback) {
  //dummy data fetched from network
  const dummyData = { test: "test" };
  callback(null, dummyData);
}

//Dummy data processing function
function processData(item, callback) {
  return callback(null, item);
}

// Dummy data posting function
function postData(item, callback) {
  return callback(null, item);
}

fetchData((err, data) => {
  if (err != null) {
    return console.log(err);
  }

  processData(data, (err, data) => {
    if (err != null) {
      return console.log(err);
    }
    postData(data, (err, res) => {
      if (err != null) {
        return console.log(err);
      }
      console.log(res);
    });
  });
});

// Callback to promisify
function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);

readFileAsync(__dirname + "/example.txt", "utf8")
  .then((data) => {
    console.log("File content:", data);
  })
  .catch((error) => {
    console.error("Error reading file:", error);
  });

// Binding this

class FileReader {
  constructor() {
    this.fileName = __dirname + "/example.txt";
  }

  async readFile(callback) {
    fs.readFile(this.fileName, "utf8", callback);
  }
}

const fileReader = new FileReader();

const frAsyncReadFile = promisify(fileReader.readFile).bind(fileReader);

frAsyncReadFile()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
