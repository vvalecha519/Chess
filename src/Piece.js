import { useState } from "react";
import Draggable from "react-draggable";

export default function Piece({ i, source, defaultPosition }) {
  const [x, setX]= useState(defaultPosition.x)
  const [y, setY]= useState(defaultPosition.y)
  const startingPosition = {x: 23, y: 23}
  const boxSize = 70
  const bound = {left: 0, top: 0, right:525, bottom: 525}
  const handleStop = (event, dragElement) => {
  let newX = Math.floor(dragElement.x /70) * boxSize + startingPosition.x 
  let newY = Math.floor(dragElement.y /70) * boxSize + startingPosition.y 
    setX(newX)
    setY(newY)
    console.log(dragElement)
  };
  const handleStart = (event, dragElement) => {
    console.log("start")
    document.getElementById("drag-con").style.zIndex = 1000
  }
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