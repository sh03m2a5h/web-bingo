import { useState } from "react";
import BingoTable from "./components/BingoTable";
import "./App.scss";
import ModalWithButton from "./components/Modal";
import Snowflake from "./components/snowflake";

function App() {
  const [isOpenRndom, setIsOpenRandom] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);

  const unusedNumbers = useRecoilState(unusedNumbersAtom);
  const usedNumbers = [];

  const handleOpenRandom = () => {
    const rnd = crypto.getRandomValues(new Uint32Array(1))[0];

    const currentIdx = (rnd / (0xffffffff + 1)) * unusedNumbers.length;
    const current = unusedNumbers[Math.floor(currentIdx)];

    unusedNumbers.splice(unusedNumbers.indexOf(current), 1);
    usedNumbers.push(current);

    setRandomNumber(current);
    setIsOpenRandom(true);
  };

  return (
    <div className="App">
      <Snowflake />
      <main>
        <BingoTable />
        <div className="card">
          {/* <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button> */}
          <div className="inset-0">
            <button
              type="button"
              onClick={handleOpenRandom}
              className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              generate Next Number
            </button>
          </div>
          <ModalWithButton
            isOpen={isOpenRndom}
            onClose={() => setIsOpenRandom(false)}
          >
            <p className="text-3xl font-bold text-center">{randomNumber}</p>
          </ModalWithButton>
        </div>
      </main>
    </div>
  );
}

export default App;
