import fs from "node:fs/promises";

const input = (await fs.readFile("06_input.txt")).toString();

for (let idx = 3; idx < input.length; idx++) {
  const current = input[idx];
  const lookback = input.slice(idx - 3, idx).split("");
  const chars = new Set([...lookback, current]);
  if (chars.size === 4) {
    console.log("start-of-packet is at ", idx + 1);
    break;
  }
}

for (let idx = 13; idx < input.length; idx++) {
  const current = input[idx];
  const lookback = input.slice(idx - 13, idx).split("");
  const chars = new Set([...lookback, current]);
  if (chars.size === 14) {
    console.log("start-of-message is at ", idx + 1);
    break;
  }
}
