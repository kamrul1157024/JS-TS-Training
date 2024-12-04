function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}
function fibCallback(n, callback) {
  if (n <= 1) {
    return callback(n);
  }

  setTimeout(() => {
    fibCallback(n - 1, (n_1) => {
      setTimeout(() => {
        fibCallback(n - 2, (n_2) => {
          callback(n_1 + n_2);
        });
      }, 0);
    });
  }, 0);
}
customModule.exports = { add, sub };
