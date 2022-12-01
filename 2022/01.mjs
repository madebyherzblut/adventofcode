// https://adventofcode.com/2022/day/1
import fs from "node:fs/promises";
import path from "node:path";

const sum = (acc, n) => acc + n;

const input = await fs.readFile("01_input.txt");
const output = input
  .toString()
  .split("\n")
  .reduce(
    (acc, line) => {
      if (line === "") {
        const total = acc.stack.reduce(sum, 0);
        const max =
          total > (acc.elves[acc.max] || 0) ? acc.elves.length : acc.max;
        return { max, stack: [], elves: [...acc.elves, total] };
      } else {
        return { ...acc, stack: acc.stack.concat(parseInt(line)) };
      }
    },
    { max: -1, stack: [], elves: [] }
  );

console.log(
  `The elve that carries the most calories is at index ${output.max} with ${
    output.elves[output.max]
  } calories.`
);

await fs.writeFile(
  path.join("debug", "01_output-p1.json"),
  JSON.stringify(output, null, 2)
);

// Part two
const calories = [...output.elves].sort((a, b) => b - a);

console.log(
  "The top three elves are carrying together %s calories.",
  calories.slice(0, 3).reduce(sum, 0)
);

await fs.writeFile(
  path.join("debug", "01_output-p2.json"),
  JSON.stringify(calories, null, 2)
);
