import fs from "node:fs/promises";

const input = await fs.readFile("04_input.txt");
const assignments = input
  .toString()
  .split("\n")
  .filter(Boolean)
  .map((line) =>
    line
      .split(",")
      .flatMap((p) => p.split("-"))
      .map((s) => parseInt(s))
  );

{
  const output = assignments.filter((a) => {
    return (a[0] >= a[2] && a[1] <= a[3]) || (a[2] >= a[0] && a[3] <= a[1]);
  });

  console.log("Fully overlapping assignments: ", output.length);
}

{
  const output = assignments.filter((a) => {
    return a[0] <= a[3] && a[2] <= a[1];
  });

  console.log("Overlapping assignments: ", output.length);
}
