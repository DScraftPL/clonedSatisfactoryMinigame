import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  BOX: "box",
};

const DraggableItem = ({ id, color }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, color },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, color]
  );

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        backgroundColor: color,
      }}
      className="m-2 cursor-grab w-12 h-12"
    >
      {id}
    </div>
  );
};

/** 
 * @param {bool} isOver
 * @param {string} color
 * @returns {string}
 */
const cellGridColor = (isOver, color) => {
  if (isOver) return "bg-yellow-300";

  switch (color) {
    case "blue":
      return "bg-blue-300";
    case "red":
      return "bg-red-300";
    case "yellow":
      return "yellow";
    case "green":
      return "bg-green-300";
    default:
      return "bg-gray-300";
  }
};

const CellGrid = ({ onDrop, index, color }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => onDrop(index, item.color, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border border-black w-full h-full transition-colors duration-200 ${cellGridColor(
        isOver,
        color
      )}`}
    ></div>
  );
};

const DropGrid = ({ handleDrop, cellColor }) => {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-1 w-64 h-64">
      {Array.from({ length: 25 }, (_, index) => (
        <CellGrid
          color={cellColor[index]}
          key={index}
          onDrop={handleDrop}
          index={index}
        />
      ))}
    </div>
  );
};

const DragAndDropComponent = () => {
  const [currentColor, setCurrentColor] = useState([
    "blue",
    "red",
    "yellow",
    "green",
  ]);
  const [cellColor, setCellColor] = useState(Array(25).fill("gray")); // Initialize all cells as gray

  const handleDrop = (index, color, id) => {
    setCellColor((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });

    console.log(color, id);

    setCurrentColor((prevColor) => {
      const colorCycle = {
        blue: "red",
        red: "yellow",
        yellow: "green",
        green: "blue",
      };
      var newColor = [...prevColor];
      newColor[id] = colorCycle[prevColor[id]];
      return newColor;
    });
  };

  return (
    <div className="flex justify-around p-20">
      <div>
        <DraggableItem id="0" color={currentColor[0]} />
        <DraggableItem id="1" color={currentColor[1]} />
        <DraggableItem id="2" color={currentColor[2]} />
        <DraggableItem id="3" color={currentColor[3]} />
      </div>
      <DropGrid cellColor={cellColor} handleDrop={handleDrop} />
      <div>
        Color cycling works, Items are separate Items need to be Tetris shape
        and affect fields with those shapes. For starters, 1 item is L, another
        T
      </div>
    </div>
  );
};

export default DragAndDropComponent;
