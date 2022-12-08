import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import ReactDOM from 'react-dom';

import { firstRow, blackPieces, whitePieces } from "./pieces";
import Draggable from "react-draggable";
import chessboard from "./assets/chessboard.png";
import "./App.css";

export default function App() {
  const bound = {left: 0, top: 0, right:525, bottom: 525}
  const logger = (event) => console.log(event);
  const getPieceImage = (i, type) => {
    if ( i < 16) {
      return blackPieces[type]
    } else {
      return whitePieces[type]
    }
  }
  return <div className="container"><img src={chessboard} alt="chessboard" className="chessboard" />
{
    firstRow.map(function (v, i) {
      return <Draggable
      defaultPosition={{x: 23+ 70* (i%8), y: 23+ 70*Math.floor(i/8) }}
      bounds={bound}
      scale={1}
      allowAnyClick={true}
      onStop={logger}
      id="draggable"
      >
    <img src={getPieceImage(i, v)} alt="coffee" className="piece" />
    </Draggable>
    })
  }
  {
    firstRow.map(function (v, i) {
      return <Draggable
      defaultPosition={{x: 23+ 70* (i%8), y: 525 - 70*Math.floor(i/8) }}
      bounds={bound}
      scale={1}
      allowAnyClick={true}
      onStop={logger}
      id="draggable"
      >
    <img src={getPieceImage(i+16, v)} alt="coffee" className="piece" />
    </Draggable>
    })
  }
</div>
}