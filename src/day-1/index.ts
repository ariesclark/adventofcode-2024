import { readFile } from "node:fs/promises";
import path from "node:path";

const input = (await readFile(path.resolve(__dirname, "input.txt"), "utf8"))
	.split("\n")
	.map((line) => line.split("   "));

const left = input.map(([a]) => Number.parseInt(a)).sort();
const right = input.map(([, b]) => Number.parseInt(b)).sort();

console.log(
	"part 1",
	left.reduce((accumulator, a, index) => {
		const b = right[index];
		return accumulator + Math.abs(a - b);
	}, 0)
);

const occurences = right.reduce(
	(accumulator, b) => {
		accumulator[b] = (accumulator[b] || 0) + 1;
		return accumulator;
	},
	{} as Record<string, number>
);

console.log(
	"part 2",
	left.reduce((accumulator, a, index) => {
		const o = occurences[a] || 0;
		return accumulator + a * o;
	}, 0)
);
