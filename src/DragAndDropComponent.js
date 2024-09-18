import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  BOX: "box",
};

const BlockTypes = {
  Single: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  T: {
    left: 1,
    right: 1,
    top: 0,
    bottom: 1
  },
  L: {
    left: 0,
    right: 1,
    top: 2,
    bottom: 0
  },
  I: {
    left: 0,
    right: 0,
    top: 1,
    bottom: 2
  }
}

const DraggableItem = ({ id, color, blockType }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, color, blockType },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, color, blockType]
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
      {blockType}
    </div>
  );
};

const cellGridColor = (isOver, color) => {
  if (isOver) return "bg-white";

  switch (color) {
    case "blue":
      return "bg-blue-500";
    case "red":
      return "bg-red-500";
    case "yellow":
      return "bg-yellow-500";
    case "green":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const CellGrid = ({ onDrop, row, col, color }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => onDrop(row, col, item.color, item.id, item.blockType),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`aspect-square border border-black h-full w-full transition-colors duration-200 ${cellGridColor(
        isOver,
        color
      )}`}
    ></div>
  );
};

const DropGrid = ({ handleDrop, cellColor }) => {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-0 h-64 w-64">
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <CellGrid
            color={cellColor[row][col]}
            key={`${row}-${col}`}
            onDrop={handleDrop}
            row={row}
            col={col}
          />
        ))
      )}
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
  const [cellColor, setCellColor] = useState(Array.from({ length: 5 }, () => Array(5).fill("gray")));

  const handleDrop = (row, col, color, id, blockType) => {
    setCellColor((prevColors) => {
      const newColors = [...prevColors];
      newColors[row][col] = color;
      const element = BlockTypes[blockType];
      if (element.left > 0) {
        for (let i = 0; i < element.left; i++) {
          newColors[row][col - i - 1] = color;
        }
      }
      if (element.right > 0) {
        for (let i = 0; i < element.right; i++) {
          newColors[row][col + i + 1] = color;
        }
      }
      if (element.top > 0) {
        for (let i = 0; i < element.top; i++) {
          newColors[row - i - 1][col] = color;
        }
      }
      if (element.bottom > 0) {
        for (let i = 0; i < element.bottom; i++) {
          newColors[row + i + 1][col] = color;
        }
      }
      return newColors;
    });
    console.log(blockType)
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
    <div className="flex flex-wrap justify-around p-20">
      <div>
        <DraggableItem id="0" color={currentColor[0]} blockType="Single" />
        <DraggableItem id="1" color={currentColor[1]} blockType="T" />
        <DraggableItem id="2" color={currentColor[2]} blockType="I" />
        <DraggableItem id="3" color={currentColor[3]} blockType="L" />
      </div>
      <DropGrid cellColor={cellColor} handleDrop={handleDrop} />
      <div>
        humble beginings, now i need to:
        fortify borders of item,
        display item on left,
        make sure items wont overlap,
        make sure items wont escape boundries,
        items on left start from center ?
      </div>
    </div>
  );
};

export default DragAndDropComponent;
