const fs = require("fs");

function customRequire(modulePath) {
  const moduleAbsPath = __dirname + "/" + modulePath;

  const contents = fs.readFileSync(moduleAbsPath, {
    encoding: "utf8",
    flag: "r",
  });

  const exports = (function () {
    const customModule = {};
    eval(contents);
    return customModule.exports;
  })();

  return exports;
}


const math = customRequire("math.js");
const stringOps = customRequire("string-ops.js");

console.log(math.add(2, 3));
console.log(stringOps.add("A", "B"));
