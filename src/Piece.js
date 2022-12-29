import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { blackPieces, whitePieces } from "./pieces";

export default function Piece({i, source, defaultPosition, chess, modifiedPiece, callBack, color, promotionCallBack, promotionPiece, pieceType}) {
  const [x, setX] = useState(defaultPosition.x);
  const [y, setY] = useState(defaultPosition.y);
  const [pieType, setPieceType] = useState(pieceType);
  const [oldPiece, setOldPiece] = useState("");
  const startingPosition = { x: 23, y: 23 };
  const boxSize = 70;
  const bound = { left: 0, top: 0, right: 525, bottom: 525 };

  const handleStop = (event, dragElement) => {
    document.getElementById(`piece-${i}-${color}`).style.zIndex = 1;
    let newX = Math.floor(dragElement.x / 70) * boxSize + startingPosition.x;
    let newY = Math.floor(dragElement.y / 70) * boxSize + startingPosition.y;
    let oldPoint = String.fromCharCode("a".charCodeAt(0) + Math.floor(x / 70)) + String(8 - Math.floor(y / 70));
    let newPoint = String.fromCharCode("a".charCodeAt(0) + Math.floor(dragElement.x / 70)) + String(8 - Math.floor(dragElement.y / 70));
    if (
      (newPoint[1] === "8" && pieType === "p" && color === "white") ||
      (newPoint[1] === "1" && pieType === "p" && color === "black")
    ) {
      if ( chess.move({ from: oldPoint, to: newPoint, promotion: "q" }) !== null ) {
        setX(newX);
        setY(newY);
        setOldPiece(oldPoint);
        callBack(color, newPoint);
        chess.undo();
        promotionCallBack(color, newPoint);
      } 
      else {
        setX(x);
        setY(y);
        return;
      }
    } 
    else {
      if (chess.move({ from: oldPoint, to: newPoint }) !== null) {
        setX(newX);
        setY(newY);
        callBack(color, newPoint);
      } else {
        setX(x);
        setY(y);
      }
    }
  };

  const handleStart = (event, dragElement) => {
    document.getElementById(`piece-${i}-${color}`).style.zIndex = 1000;
  };

  useEffect(() => {

    //update rook position
    if(i === 0) {
      console.log("rook")
      let x = chess.history({ verbose: true })
      if ( x.length > 0 ) console.log(x.at(-1).flags)
    }


    let currentPoint = String.fromCharCode("a".charCodeAt(0) + Math.floor(x / 70)) + String(8 - Math.floor(y / 70));
    if (modifiedPiece != null && color !== modifiedPiece.color && currentPoint === modifiedPiece.location) {
      //hide piece
      document.getElementById(`drag-con-${i}-${color}`).style.display = "none";
    }
    if (promotionPiece != null && color == promotionPiece.color && currentPoint == promotionPiece.location) {
      //hide piece
      chess.move({ from: oldPiece, to: currentPoint, promotion: promotionPiece.type });
      if (color == "white")
        document.getElementById(`piece-${i}-${color}`).src =
          whitePieces[promotionPiece.type];
      else
        document.getElementById(`piece-${i}-${color}`).src = blackPieces[promotionPiece.type];
      setPieceType(promotionPiece.type);
    }
  });

  return (
    <div id={`drag-con-${i}-${color}`}>
      <Draggable
        defaultPosition={defaultPosition}
        position={{ x: x, y: y }}
        bounds={bound}
        scale={1}
        allowAnyClick={true}
        id="draggable"
        onStop={handleStop}
        onStart={handleStart}
      >
        <img
          src={source}
          alt="coffee"
          className="piece"
          id={`piece-${i}-${color}`}
        />
      </Draggable>
    </div>
  );
}
