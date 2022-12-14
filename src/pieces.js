import rook from "../src/assets/Chess_rdt60.png";
import knight from "../src/assets/Chess_ndt60.png";
import bishop from "../src/assets/Chess_bdt60.png";
import king from "../src/assets/Chess_qdt60.png";
import queen from "../src/assets/Chess_kdt60.png";
import pawn from "../src/assets/Chess_pdt60.png";

import rook2 from "../src/assets/Chess_rlt60.png";
import knight2 from "../src/assets/Chess_nlt60.png";
import bishop2 from "../src/assets/Chess_blt60.png";
import king2 from "../src/assets/Chess_qlt60.png";
import queen2 from "../src/assets/Chess_klt60.png";
import pawn2 from "../src/assets/Chess_plt60.png";


const firstRow = ["r", "n", "b", "q", "k", "b","n", "r",
"p", "p", "p", "p", "p", "p","p", "p"];

const blackPieces = {
"r": rook,
"n": knight,
"b": bishop,
"k": king,
"q": queen,
"p": pawn
}

const whitePieces = {
  "r": rook2,
  "n": knight2,
  "b": bishop2,
  "k": king2,
  "q": queen2,
  "p": pawn2
  }

export {firstRow, blackPieces, whitePieces }