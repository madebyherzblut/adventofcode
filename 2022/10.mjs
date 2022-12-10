import fs from "node:fs/promises";

const input = (await fs.readFile("10_input.txt"))
  .toString()
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [op, value] = line.split(" ");
    return [op, value ? parseInt(value) : undefined];
  });

const ops = [];
for (let i = 0; i < input.length; i++) {
  if (input[i][0] === "noop") {
    ops.push(null);
  } else if (input[i][0] === "addx") {
    ops.push(null);
    ops.push(input[i][1]);
  }
}

{
  let register = 1;
  let strength = 0;

  for (let i = 0; i < ops.length; i++) {
    if ((i + 1) % 40 === 20) {
      strength += register * (i + 1);
    }
    if (ops[i] === null) {
      continue;
    }

    register += ops[i];
  }

  console.log("The signal strength is", strength);
}

{
  let register = 1;
  let output = "";

  for (let i = 0; i < ops.length; i++) {
    const pos = i % 40;

    if (Math.abs(register - pos) <= 1) {
      output += "█";
    } else {
      output += ".";
    }
    if (pos === 39) {
      output += "\n";
    }

    if (ops[i] === null) {
      continue;
    }

    register += ops[i];
  }

  console.log(output);
}
