import React from "react";

const bingo = "BINGO";
const bingoArr = [1, 16, 31, 46, 61].map((e) => {
  return [...new Uint8Array(15)].map((_, i) => i + e);
});


