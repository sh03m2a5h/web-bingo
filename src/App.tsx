import { useState } from "react";
import { useRecoilState } from "recoil";
import { unusedNumbersAtom, usedNumbersAtom } from "./states/bingoNumbers";
import BingoTable from "./components/BingoTable";
// import ModalWithButton from "./components/Modal";
import RandomNumberModal from "./components/RandomNumberModal";
import Snowflake from "./components/snowflake";
import "./App.scss";

function App() {
  const [isOpenRndom, setIsOpenRandom] = useState(false);

  const [unusedNumbers, setUnusedNumbers] = useRecoilState(unusedNumbersAtom);
  const [usedNumbers, setUsedNumbers] = useRecoilState(usedNumbersAtom);

  const handleNumberFixed = (num: number) => {
    setUnusedNumbers(unusedNumbers.filter((n) => n !== num));
    setUsedNumbers([...usedNumbers, num]);
  };

  const handleOpenRandom = () => {
    setIsOpenRandom(true);
  };

  const handleCloseRandom = () => {
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
              className="rounded-md bg-black/40 px-4 py-2 text-sm font-medium text-white hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Generate next number
            </button>
          </div>
          <RandomNumberModal
            isOpen={isOpenRndom}
            onClose={handleCloseRandom}
            onFixed={handleNumberFixed}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
