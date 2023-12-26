import { useState } from "react";
import BingoTable from "./BingoTable";
import "./App.scss";

const flakes = new Array(50).fill(0);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {flakes.map((_, i) => (
        <div key={i} className="snowflake"></div>
      ))}
      <main>
        {/* <BingoTable /> */}
        <h1>React + Vite</h1>
        <h2>On CodeSandbox!</h2>
        <div className="card">
          {/* <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button> */}
          <button>generate Next Number</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR.
          </p>

          <p>
            Tip: you can use the inspector button next to address bar to click
            on components in the preview and open the code in the editor!
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
