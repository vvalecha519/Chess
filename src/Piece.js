import { useState, useEffect } from "react";
import Draggable from "react-draggable";

export default function Piece({ i, source, defaultPosition, chess }) {
  const [x, setX]= useState(defaultPosition.x)
  const [y, setY]= useState(defaultPosition.y)
  const [chessLogic, setChessLogic]= useState(chess)
  const startingPosition = {x: 23, y: 23}
  let counter = 0
  const boxSize = 70
  const bound = {left: 0, top: 0, right:525, bottom: 525}



  const handleStop = (event, dragElement) => {
  let newX = Math.floor(dragElement.x /70) * boxSize + startingPosition.x 
  let newY = Math.floor(dragElement.y /70) * boxSize + startingPosition.y 
  let oldPoint = String.fromCharCode('a'.charCodeAt(0) + Math.floor(x /70)) + String(8 - Math.floor(y /70))
  let newPoint = String.fromCharCode('a'.charCodeAt(0) + Math.floor(dragElement.x /70)) + String(8 - Math.floor(dragElement.y /70))
    if ( chess.move({ from: oldPoint, to: newPoint }) !== null) {
      setX(newX)
      setY(newY)
    } else {
      setX(x)
      setY(y)
    }
  };


  const handleStart = (event, dragElement) => {
    console.log("start")
    document.getElementById("drag-con").style.zIndex = 1000
  }



  useEffect(()=>{
    if ( i === 0) {
      document.getElementById("drag-con").style.display = "none"
    }
  })


  return (
    <div id="drag-con">
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
      <img src={source} alt="coffee" className="piece" id="piece"/>
    </Draggable>
    </div>
  );
}