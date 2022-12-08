import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import ReactDOM from 'react-dom';

import Draggable from "react-draggable";
import chessPiece from "./assets/Chess_bdt60.png";
import chessboard from "./assets/chessboard.png";
import "./App.css";

export default function App() {
  const bound = {left: 25, top: 25, right:525, bottom: 525}
  const logger = (event) => console.log(event);
  return <div><img src={chessboard} alt="chessboard" className="chessboard" />
    <Draggable
  defaultPosition={{x: 20, y: 20}}
  bounds={bound}
  scale={1}
  allowAnyClick={true}
  onStop={logger}
  id="draggable"
  >
<img src={chessPiece} alt="coffee" />
</Draggable>
</div>
}