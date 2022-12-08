import fs from "node:fs/promises";
import path from "node:path";

let cwd = "";

const input = (await fs.readFile("07_input.txt"))
  .toString()
  .split("\n")
  .map((line) => {
    let i;
    if (line.startsWith("$ cd")) {
      i = { type: "cmd", cmd: "cd", dir: line.replace("$ cd ", "") };
    } else if (line.startsWith("$ ls")) {
      return null;
    } else if (line.startsWith("dir ")) {
      i = { type: "inode", t: "dir", name: line.replace("dir ", ""), size: 0 };
    } else if (line.match(/\d+\s.+/)) {
      const [, size, name] = line.match(/^(\d+)\s(.+)$/);
      i = { type: "inode", t: "file", name, size: parseInt(size) };
    }

    if (i.type === "cmd" && i.cmd == "cd") {
      cwd = path.join(cwd, i.dir);
      i.path = cwd;
    } else {
      i.path = path.join(cwd, i.name);
    }

    return i;
  })
  .filter((i) => i && i.type === "inode");

const rollup = (tree, parent, size) => {
  while (parent !== "/") {
    tree[parent] = (tree[parent] || 0) + size;
    parent = path.dirname(parent);
  }

  tree["/"] = (tree["/"] || 0) + size;
};

const tree = input.reduce((acc, i) => {
  rollup(acc, path.dirname(i.path), i.size);
  return acc;
}, {});

{
  const output = Object.entries(tree)
    .filter(([p, s]) => !p.includes(".") && s <= 100_000)
    .reduce((acc, [, s]) => acc + s, 0);

  console.log("Part 1:", output);
}

{
  const total = 70_000_000;
  const required = 30_000_000;
  const current = tree["/"];
  const unused = total - current;

  const output = Object.entries(tree)
    .filter(([p, s]) => s >= required - unused)
    .sort((a, b) => a[1] - b[1])
    .shift();

  console.log("Part 2: Delete %s (%s)", output[0], output[1]);
}
