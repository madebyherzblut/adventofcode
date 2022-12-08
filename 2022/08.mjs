import fs from "node:fs/promises";

const input = (await fs.readFile("08_input.txt"))
  .toString()
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("").map((i) => parseInt(i)));

const vec = (x, y) => `${x},${y}`;

{
  const visible = new Set();
  for (let ri = 0; ri < input.length; ri++) {
    for (let ci = 0; ci < input[ri].length; ci++) {
      const height = input[ri][ci];

      // Check if the tree is on the edge
      if (
        ri === 0 ||
        ri === input.length - 1 ||
        ci === 0 ||
        ci === input[ri].length - 1
      ) {
        visible.add(vec(ri, ci));
        continue;
      }

      const rays = [true, true, true, true];

      // Check if the tree is hidden from the top
      for (let i = ri - 1; i >= 0; i--) {
        if (input[i][ci] >= height) {
          rays[0] = false;
          break;
        }
      }

      // Check if the tree is hidden from the bottom
      for (let i = ri + 1; i < input.length; i++) {
        if (input[i][ci] >= height) {
          rays[2] = false;
          break;
        }
      }

      // Check if the tree is hidden from the left
      for (let i = ci - 1; i >= 0; i--) {
        if (input[ri][i] >= height) {
          rays[3] = false;
          break;
        }
      }

      // Check if the tree is hidden from the right
      for (let i = ci + 1; i < input[ri].length; i++) {
        if (input[ri][i] >= height) {
          rays[1] = false;
          break;
        }
      }

      if (rays.some((r) => r === true)) {
        visible.add(vec(ri, ci));
      }
    }
  }

  console.log("%d trees are visible from the outside", visible.size);
}

{
  let score = -1;

  for (let ri = 0; ri < input.length; ri++) {
    for (let ci = 0; ci < input[ri].length; ci++) {
      const height = input[ri][ci];
      const trees = [ri, input[ri].length - ci - 1, input.length - ri - 1, ci];

      for (let i = ri - 1; i >= 0; i--) {
        if (input[i][ci] >= height) {
          trees[0] = ri - i;
          break;
        }
      }

      for (let i = ri + 1; i < input.length; i++) {
        if (input[i][ci] >= height) {
          trees[2] = i - ri;
          break;
        }
      }

      for (let i = ci - 1; i >= 0; i--) {
        if (input[ri][i] >= height) {
          trees[3] = ci - i;

          break;
        }
      }

      for (let i = ci + 1; i < input[ri].length; i++) {
        if (input[ri][i] >= height) {
          trees[1] = i - ci;
          break;
        }
      }

      score = Math.max(
        score,
        trees.reduce((acc, i) => acc * i, 1)
      );
    }
  }

  console.log("The highest scenic score possible is ", score);
}
