import { useState } from "react";
import { useRecoilState } from "recoil";
import { unusedNumbersAtom, usedNumbersAtom } from "./states/bingoNumbers";
import BingoTable from "./components/BingoTable";
import ModalWithButton from "./components/Modal";
import Snowflake from "./components/snowflake";
import "./App.scss";

function App() {
  const [isOpenRndom, setIsOpenRandom] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);

  const [unusedNumbers, setUnusedNumbers] = useRecoilState(unusedNumbersAtom);
  const [usedNumbers, setUsedNumbers] = useRecoilState(usedNumbersAtom);

  const handleOpenRandom = () => {
    const rnd = crypto.getRandomValues(new Uint32Array(1))[0];

    const currentIdx = (rnd / (0xffffffff + 1)) * unusedNumbers.length;
    const current = unusedNumbers[Math.floor(currentIdx)];

    console.log(unusedNumbers, usedNumbers, current);

    setRandomNumber(current);

    const startedAt = Date.now();
    const shuffleRandomFn = () => {
      const rnd = crypto.getRandomValues(new Uint32Array(1))[0];
      const currentIdx = (rnd / (0xffffffff + 1)) * unusedNumbers.length;
      const current = unusedNumbers[Math.floor(currentIdx)];
      setRandomNumber(current);
      const diff = Date.now() - startedAt;
      // duration=10/(-diff/10-1)**2
      const duration = Math.max(10, 1 / (diff / 12000 - 1) ** 2);
      if (Date.now() - startedAt < 10000) {
        setTimeout(shuffleRandomFn, duration);
      }
    };
    setTimeout(shuffleRandomFn, 10);

    setIsOpenRandom(true);
  };

  const handleCloseRandom = () => {
    setUnusedNumbers(unusedNumbers.filter((n) => n !== randomNumber));
    setUsedNumbers([...usedNumbers, randomNumber]);

    setIsOpenRandom(false);
  };

  return (
    <div className="App">
      <Snowflake />
      <main>
        <BingoTable />
        <div className="card">
          <div className="inset-0">
            <button
              type="button"
              onClick={handleOpenRandom}
              className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              generate Next Number
            </button>
          </div>
          <ModalWithButton isOpen={isOpenRndom} onClose={handleCloseRandom}>
            <p className="text-5xl font-bold text-center">
              {String(randomNumber)}
            </p>
          </ModalWithButton>
        </div>
      </main>
    </div>
  );
}

export default App;
