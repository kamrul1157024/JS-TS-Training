import { parentPort, workerData } from "node:worker_threads";

function calculateFactorial(num) {
  return num === 0 ? 1 : num * calculateFactorial(num - 1);
}

const result = calculateFactorial(workerData.number);

parentPort.postMessage(result);
