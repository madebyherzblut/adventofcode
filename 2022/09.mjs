import fs from "node:fs/promises";

const input = (await fs.readFile("09_input.txt"))
  .toString()
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [dir, steps] = line.split(" ");
    return [dir, parseInt(steps)];
  });

const vec = ([x, y]) => `${x},${y}`;

{
  const head = [0, 0];
  const tail = [0, 0];
  const visited = new Set([vec(tail)]);

  for (const [dir, steps] of input) {
    for (let step = 0; step < steps; step++) {
      if (dir === "U") head[1]--;
      if (dir === "D") head[1]++;
      if (dir === "L") head[0]--;
      if (dir === "R") head[0]++;

      const xd = head[0] - tail[0];
      const yd = head[1] - tail[1];

      if (Math.abs(xd) > 1) {
        tail[0] = tail[0] + Math.sign(xd);
        tail[1] = head[1];
      } else if (Math.abs(yd) > 1) {
        tail[0] = head[0];
        tail[1] = tail[1] + Math.sign(yd);
      }

      visited.add(vec(tail));
    }
  }

  console.log("Part 1: The tail visited %s positions", visited.size);
}

{
  const head = [0, 0];
  const tails = Array(9)
    .fill()
    .map(() => [0, 0]);

  const visited = new Set([vec(tails[0])]);

  for (const [dir, steps] of input) {
    for (let step = 0; step < steps; step++) {
      if (dir === "U") head[1]--;
      if (dir === "D") head[1]++;
      if (dir === "L") head[0]--;
      if (dir === "R") head[0]++;

      tails.forEach((tail, idx) => {
        const prev = tails[idx - 1] || head;
        const xd = prev[0] - tail[0];
        const yd = prev[1] - tail[1];

        if (Math.abs(xd) > 1 && Math.abs(yd) > 1) {
          tail[0] = tail[0] + Math.sign(xd);
          tail[1] = tail[1] + Math.sign(yd);
        } else if (Math.abs(xd) > 1) {
          tail[0] = tail[0] + Math.sign(xd);
          tail[1] = prev[1];
        } else if (Math.abs(yd) > 1) {
          tail[0] = prev[0];
          tail[1] = tail[1] + Math.sign(yd);
        }
      });

      visited.add(vec(tails.at(-1)));
    }
  }

  console.log("Part 2: The tail visited %s positions", visited.size);
}
