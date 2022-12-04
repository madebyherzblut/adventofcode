import fs from "node:fs/promises";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const input = await fs.readFile("03_input.txt");
const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

{
  const output = input
    .toString()
    .split("\n")
    .reduce((acc, line) => {
      const contents = line.split("");
      const index = Math.ceil(contents.length / 2);
      const compartments = [contents.splice(0, index), contents.splice(-index)];
      const shared = compartments[0].find((i) => compartments[1].includes(i));

      return acc + priority.indexOf(shared) + 1;
    }, 0);

  console.log("Part 1: ", output);
}

{
  const output = chunk(
    input
      .toString()
      .split("\n")
      .filter(Boolean)
      .map((l) => l.split("")),
    3
  ).reduce((acc, group) => {
    const shared = group[0].find(
      (i) => group[1].includes(i) && group[2].includes(i)
    );
    return acc + priority.indexOf(shared) + 1;
  }, 0);

  console.log("Part 2: ", output);
}
