import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { firstRow, blackPieces, whitePieces } from "./pieces";

export default function Piece({ i, source, defaultPosition, chess, mP, callBack, color, promotionCallBack, pP }) {
  const [x, setX]= useState(defaultPosition.x)
  const [y, setY]= useState(defaultPosition.y)
  const [chessLogic, setChessLogic]= useState(chess)
  const [modifiedPiece, setModifiedPiece] = useState(mP)
  const [promotionPiece, setPromotionPiece] = useState(pP)
  const startingPosition = {x: 23, y: 23}
  const boxSize = 70
  const bound = {left: 0, top: 0, right:525, bottom: 525} 

  const handleStop = (event, dragElement) => {
  let newX = Math.floor(dragElement.x /70) * boxSize + startingPosition.x 
  let newY = Math.floor(dragElement.y /70) * boxSize + startingPosition.y 
  let oldPoint = String.fromCharCode('a'.charCodeAt(0) + Math.floor(x /70)) + String(8 - Math.floor(y /70))
  let newPoint = String.fromCharCode('a'.charCodeAt(0) + Math.floor(dragElement.x /70)) + String(8 - Math.floor(dragElement.y /70))

  if ( newPoint[1] === '8') {
    console.log(oldPoint)
    console.log(newPoint)
  if (chess.move({ from: oldPoint, to: newPoint, promotion:'q'}) !== null) {
    setX(newX)
    setY(newY)
    chess.undo()
    promotionCallBack(color, newPoint)
  } else {
    console.log("promotion not success")
    setX(x)
    setY(y)
    return
  }
} else {

    if ( chess.move({ from: oldPoint, to: newPoint }) !== null) {
      setX(newX)
      setY(newY)
      callBack(color, newPoint)
    } else {
      setX(x)
      setY(y)
    }
  }
  };


  const handleStart = (event, dragElement) => {
    document.getElementById(`drag-con-${i}-${color}`).style.zIndex = 1000
  }


  useEffect(()=>{
    let oldPoint = String.fromCharCode('a'.charCodeAt(0) + Math.floor(x /70)) + String(8 - Math.floor(y /70))
    if ( mP != null && color !== mP.color && oldPoint === mP.location) {
      //hide piece
      document.getElementById(`drag-con-${i}-${color}`).style.display = "none"
    }
    console.log(pP != null)
    if ( pP != null) {
    console.log(color,pP.color)
    console.log(oldPoint, pP.location)
    }
    if ( pP != null && color == pP.color && oldPoint == pP.location) {
      //hide piece
      console.log("change source")
      document.getElementById(`piece-${i}-${color}`).src= whitePieces['q']
    }
  }, )


  return (
    <div id={`drag-con-${i}-${color}`}>
    <Draggable
      defaultPosition={defaultPosition}
      position={{x:x,y: y}}
      bounds={bound}
      scale={1}
      allowAnyClick={true}
      id="draggable"
      onStop={handleStop} 
      onStart={handleStart} 
    >
      <img src={source} alt="coffee" className="piece" id={`piece-${i}-${color}`}/>
    </Draggable>
    </div>
  );
}