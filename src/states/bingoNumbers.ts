import { atom } from "recoil";

const shuffleArray = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const loadUsed = (): number[] => {
  const used = localStorage.getItem("usedNumbers");
  if (used) {
    return JSON.parse(used);
  }
  return [];
};

const loadUnused = (): number[] => {
  const used = loadUsed();
  return shuffleArray(
    new Array(75)
      .fill(0)
      .map((_, i) => i + 1)
      .filter((x) => !used.includes(x)),
  );
};

const unusedNumbersAtom = atom({
  key: "UnusedNumbers",
  default: loadUnused(),
});

const usedNumbersAtom = atom({
  key: "UsedNumbers",
  default: loadUsed(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("usedNumbers", JSON.stringify(newValue));
      });
    },
  ],
});

export { unusedNumbersAtom, usedNumbersAtom };
