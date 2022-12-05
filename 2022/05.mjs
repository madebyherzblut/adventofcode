import fs from "node:fs/promises";

const input = (await fs.readFile("05_input.txt")).toString();
const [stackInput, opInput] = input.split("\n\n");

const stacks = stackInput
  .split("\n")
  .map((line) =>
    line.match(/.{1,4}/g).map((s) => s.trim().replace(/[\[\]]/g, ""))
  )
  .slice(0, -1)
  .reduce((acc, line) => {
    line.forEach((slot, idx) => {
      if (slot !== "") {
        acc[idx] = (acc[idx] || []).concat(slot);
      }
    });

    return acc;
  }, []);

const ops = opInput
  .split("\n")
  .filter(Boolean)
  .map((line) => line.match(/\d+/g).map((i) => parseInt(i)));

{
  const output = ops.reduce((acc, op) => {
    let [count, source, target] = op;

    acc[target - 1].unshift(...acc[source - 1].slice(0, count).reverse());
    acc[source - 1].splice(0, count);

    return acc;
  }, structuredClone(stacks));

  console.log("Stacks (CrateMover 9000): ", output.map((s) => s[0]).join(""));
}

{
  const output = ops.reduce((acc, op) => {
    let [count, source, target] = op;

    acc[target - 1].unshift(...acc[source - 1].slice(0, count));
    acc[source - 1].splice(0, count);

    return acc;
  }, structuredClone(stacks));

  console.log("Stacks: (CrateMover 9001)", output.map((s) => s[0]).join(""));
}
