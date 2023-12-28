import { useRecoilState } from "recoil";
import { usedNumbersAtom } from "../states/bingoNumbers";
import { Transition } from "@headlessui/react";
// import "./BingoTable.scss";

const bingo = "BINGO";
const bingoArr = [1, 16, 31, 46, 61].map((e) => {
  return [...new Uint8Array(15)].map((_, i) => i + e);
});

const BingoTable = () => {
  const [usedNumbers] = useRecoilState(usedNumbersAtom);

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
                    <td key={cell} className="text-2xl">
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
                return <td key={cell} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
};

export default BingoTable;
