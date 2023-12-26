import { atom } from "recoil";

const unusedNumbersAtom = atom({
  key: "UnusedNumbers",
  default: new Array(75).fill(0).map((_, i) => i + 1) as number[],
});

const usedNumbersAtom = atom({
  key: "UsedNumbers",
  default: [] as number[],
});

export { unusedNumbersAtom, usedNumbersAtom };
