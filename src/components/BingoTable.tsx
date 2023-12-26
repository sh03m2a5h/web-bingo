import "./BingoTable.scss";

const bingo = "BINGO";
const bingoArr = [1, 16, 31, 46, 61].map((e) => {
  return [...new Uint8Array(15)].map((_, i) => i + e);
});

const BingoTable = () => {
  return (
    <table className="bingo-table">
      <tbody>
        {bingoArr.map((row, i) => {
          return (
            <tr key={row.join()}>
              {/* <th>{bingo[i]}</th> */}
              {row.map((cell) => {
                return <td key={cell}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BingoTable;
