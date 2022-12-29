import { useState } from "react";
import { Chess } from "chess.js";
import { firstRow, blackPieces, whitePieces } from "./pieces";
import chessboard from "./assets/chessboard.png";
import "./App.css";
import Piece from "./Piece";

export default function App() {
  const startingPosition = { x: 23, y: 23 };
  const boxSize = 70;
  const [chess, setChess] = useState(new Chess());
  const [modifiedPiece, setModifiedPiece] = useState(null);
  const [castlingPiece, setCastlingPiece] = useState(null);
  const [promotionPiece, setPromotionPiece] = useState(null);
  const [currentPromotionPiece, setCurrentPromotionPiece] = useState(null);
  const getPieceImage = (i, type) => {
    if (i < 16) {
      return blackPieces[type];
    } else {
      return whitePieces[type];
    }
  };

  const castlingCallBack = (oldLoc, newLoc, color) => {
    console.log("castling")
    console.log(oldLoc, newLoc, color)
    setCastlingPiece({ currentLoc: oldLoc, newLoc: newLoc, color: color});
  };

  const callBack = (color, location) => {
    if (chess.isCheckmate()) {
      alert("Checkmate");
    } else if (chess.isCheck()) {
      alert("Check");
    }
    setModifiedPiece({ color: color, location: location });
  };

  const promotionCallBack = (color, location) => {
    console.log("promotion");
    let input = document.getElementById("input");
    input.disabled = false;
    console.log(location);
    setCurrentPromotionPiece({ color: color, location: location });
  };

  const handleChange = (event) => {
    let input = document.getElementById("input");
    setPromotionPiece({
      color: currentPromotionPiece.color,
      location: currentPromotionPiece.location,
      type: event.target.value
    });
    input.value = "";
    input.disabled = true;
  };

  return (
    <div className="container">
      <img src={chessboard} alt="chessboard" className="chessboard" />
      {firstRow.map(function (v, i) {
        return (
          <Piece
            i={i}
            source={getPieceImage(i, v)}
            defaultPosition={{
              x: startingPosition.x + boxSize * (i % 8),
              y: startingPosition.x + boxSize * Math.floor(i / 8)
            }}
            chess={chess}
            modifiedPiece={modifiedPiece}
            castlingPiece={castlingPiece}
            callBack={callBack}
            castlingCallBack={castlingCallBack}
            color={"black"}
            promotionCallBack={promotionCallBack}
            promotionPiece={promotionPiece}
            pieceType={v}
          ></Piece>
        );
      })}
      {firstRow.map(function (v, i) {
        return (
          <Piece
            i={i}
            source={getPieceImage(i + 16, v)}
            defaultPosition={{
              x: startingPosition.x + boxSize * (i % 8),
              y: 515 - boxSize * Math.floor(i / 8)
            }}
            chess={chess}
            modifiedPiece={modifiedPiece}
            castlingPiece={castlingPiece}
            callBack={callBack}
            castlingCallBack={castlingCallBack}
            color={"white"}
            promotionCallBack={promotionCallBack}
            promotionPiece={promotionPiece}
            pieceType={v}
          ></Piece>
        );
      })}
      <input
        type="text"
        id="input"
        placeholder="Enter letter of piece"
        disabled={true}
        onChange={handleChange}
      />
      <button onClick={() => console.log(chess.ascii())
      }>
        View Chess Model
      </button>
    </div>
  );
}
