// https://adventofcode.com/2022/day/2
import fs from "node:fs/promises";
import path from "node:path";

const input = await fs.readFile("02_input.txt");

const mapping = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const points = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcome = {
  "rock rock": 3,
  "rock paper": 6,
  "rock scissors": 0,
  "paper rock": 0,
  "paper paper": 3,
  "paper scissors": 6,
  "scissors rock": 6,
  "scissors paper": 0,
  "scissors scissors": 3,
};

{
  const output = input
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split(" ").map((d) => mapping[d]))
    .reduce(
      (score, round) => score + points[round[1]] + outcome[round.join(" ")],
      0
    );

  console.log("Part 1: You score %s points with this strategy", output);

  await fs.writeFile(
    path.join("debug", "02_output-p1.json"),
    JSON.stringify(output, null, 2)
  );
}

{
  const ending = {
    X: 0,
    Y: 3,
    Z: 6,
  };

  const output = input
    .toString()
    .split("\n")
    .filter(Boolean)
    .reduce((score, line) => {
      let [opponent, you] = line.split(" ");

      opponent = mapping[opponent];

      const should = ending[you];
      const target = Object.entries(outcome).find(
        ([o, p]) => o.startsWith(opponent) && p == should
      );

      const round = target[0].split(" ");
      const total = points[round[1]] + outcome[target[0]];

      return score + total;
    }, 0);

  console.log("Part 2: You score %s points with this strategy", output);
}
