var math = (function () {
  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  return { add, sub };
})();

var stringOps = (function () {
  function add(a, b) {
    return a + b;
  }

  function sub(s, l, r) {
    return s.substring(l, r);
  }

  return { add, sub };
})();

math.add(2, 3);
math.sub(10, 8);

stringOps.add("a", "b");
stringOps.sub("Flying", 2, 3);
