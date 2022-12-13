import { useEffect, useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import ReactDOM from 'react-dom';

import { firstRow, blackPieces, whitePieces } from "./pieces";
import Draggable from "react-draggable";
import chessboard from "./assets/chessboard.png";
import "./App.css";
import Piece from "./Piece";

export default function App() {
  const startingPosition = {x: 23, y: 23}
  const boxSize = 70
  const bound = {left: 0, top: 0, right:525, bottom: 525}
  const [chess, setChess] = useState(new Chess())
  const [modifiedPiece, setModifiedPiece] = useState(null)
  const getPieceImage = (i, type) => {
    if ( i < 16) {
      return blackPieces[type]
    } else {
      return whitePieces[type]
    }
  }

  const callBack = (color, location) => {
    if ( chess.isCheckmate() ) {
      alert("Checkmate")
    } else if ( chess.isCheck() ) {
      alert("Check")
    }
    setModifiedPiece({color:color, location:location})
  }

  useEffect(()=>{
 console.log(chess.ascii())
  }, )

  return <div className="container"><img src={chessboard} alt="chessboard" className="chessboard" />
{
    firstRow.map(function (v, i) {
      return <Piece
      i={i}
      source={getPieceImage(i, v)}
      defaultPosition={{x: startingPosition.x+ boxSize* (i%8), y: startingPosition.x+ boxSize*Math.floor(i/8)  }}
      chess={chess}  
      mP={modifiedPiece}
      callBack={callBack}
      color={"black"}
      >
    </Piece>
    })
  }
  {
    firstRow.map(function (v, i) {
      return <Piece
      i={i}
      source={getPieceImage(i+16, v)}
      defaultPosition={{x: startingPosition.x+ boxSize* (i%8), y: 515 - boxSize*Math.floor(i/8) }}
      chess={chess}  
      mP={modifiedPiece}
      callBack={callBack}
      color={"white"}
      >
    </Piece>
    })
  }
</div>
}