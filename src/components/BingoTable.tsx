import { useRecoilState } from "recoil";
import { usedNumbersAtom, unusedNumbersAtom } from "../states/bingoNumbers";
import { Transition } from "@headlessui/react";
// import "./BingoTable.scss";

const bingo = "BINGO";
const bingoArr = [1, 16, 31, 46, 61].map((e) => {
  return [...new Uint8Array(15)].map((_, i) => i + e);
});

const BingoTable = () => {
  const [usedNumbers, setUsedNumbers] = useRecoilState(usedNumbersAtom);
  const [unusedNumbers, setUnusedNumbers] = useRecoilState(unusedNumbersAtom);

  const handleCellDoubleClick = (cell: number) => {
    if (usedNumbers.includes(cell)) {
      if (!confirm("数字を消しますか?")) {
        return;
      }
      setUsedNumbers(usedNumbers.filter((n) => n !== cell));
      setUnusedNumbers([...unusedNumbers, cell]);
    } else {
      if (!confirm("数字を入れますか?")) {
        return;
      }
      setUsedNumbers([...usedNumbers, cell]);
      setUnusedNumbers(unusedNumbers.filter((n) => n !== cell));
    }
  };

  return usedNumbers !== null ? (
    <table className="border-collapse">
      <tbody>
        {bingoArr.map((row, i) => {
          return (
            <tr key={row.join()}>
              <th className="text-2xl text-bold">{bingo[i]}</th>
              {row.map((cell) => {
                if (usedNumbers.includes(cell)) {
                  return (
                    <td
                      key={cell}
                      className="text-2xl select-none"
                      onDoubleClick={() => handleCellDoubleClick(cell)}
                    >
                      <Transition
                        key={cell}
                        show={true}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-120"
                      >
                        {cell}
                      </Transition>
                    </td>
                  );
                }
                return (
                  <td
                    key={cell}
                    onDoubleClick={() => handleCellDoubleClick(cell)}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
};

export default BingoTable;
