import React, { useState } from "react";
import BlockTypes from './data/blockTypes.json'
import DraggableItem from './compontents/DraggableItem.js'
import DropGrid from './compontents/DropGrid.js'

const DragAndDropComponent = () => {
  const [currentColor, setCurrentColor] = useState([
    "blue",
    "yellow",
    "green",
    "pink"
  ]);
  const [currentBlocks, setCurrentBlocks] = useState(["Single", "I", "L", "mirror_L"])
  const [cellColor, setCellColor] = useState(Array.from({ length: 5 }, () => Array(5).fill("gray")));
  const [hoveredCells, setHoveredCells] = useState(Array.from({ length: 5 }, () => Array(5).fill(false)));
  const [filledCells, setFilledCells] = useState(Array.from({ length: 5 }, () => Array(5).fill(0)));
  const [currentId, setCurrentId] = useState(1);

  const handleReset = () => {
    setCellColor(() => Array.from({ length: 5 }, () => Array(5).fill("gray")));
    setFilledCells(() => {
      return Array.from({ length: 5 }, () => Array(5).fill(0));
    });
    setCurrentId(1);
  };

  const handleHover = (row, col, blockType) => {
    const element = BlockTypes[blockType];
    var newCells = Array.from({ length: 5 }, () => Array(5).fill(false));
    if (col - element.left >= 0 && col + element.right <= 4 && row - element.top >= 0 && row + element.bottom <= 4) {
      newCells[row][col] = true;
      for (let i = 0; i < element.left; i++) {
        newCells[row][col - i - 1] = true;
      }
      for (let i = 0; i < element.right; i++) {
        newCells[row][col + i + 1] = true;
      }
      for (let i = 0; i < element.top; i++) {
        newCells[row - i - 1][col] = true;
      }
      for (let i = 0; i < element.bottom; i++) {
        newCells[row + i + 1][col] = true;
      }
    }
    setHoveredCells(newCells);
  }

  const checkIfFilled = (filled, row, col, blockType) => {
    const element = BlockTypes[blockType];
    console.log(filled)
    if (row - element.top < 0 || row - element.bottom > 4) {
      return false;
    }
    if (filled[row][col] !== 0) {
      return false;
    }
    for (let i = 0; i < element.left; i++) {
      if (filled[row][col - i - 1] !== 0) {
        return false;
      }
    }
    for (let i = 0; i < element.right; i++) {
      if (filled[row][col + i + 1] !== 0) {
        return false;
      }
    }
    for (let i = 0; i < element.top; i++) {
      if (filled[row - i - 1][col] !== 0) {
        return false;
      }
    }
    for (let i = 0; i < element.bottom; i++) {
      if (filled[row + i + 1][col] !== 0) {
        return false;
      }
    }
    return true;
  };

  const handleDrop = (row, col, color, id, blockType) => {
    const element = BlockTypes[blockType];
    setCurrentId((prevCurrentId) => {
      setFilledCells((prevFilledCells) => {
        if (checkIfFilled(prevFilledCells, row, col, blockType) && col - element.left >= 0 && col + element.right <= 4 && row - element.top >= 0 && row + element.bottom <= 4) {
          const newFilledCells = prevFilledCells.map(row => [...row]);
          newFilledCells[row][col] = prevCurrentId;

          for (let i = 0; i < element.left; i++) {
            newFilledCells[row][col - i - 1] = prevCurrentId;
          }
          for (let i = 0; i < element.right; i++) {
            newFilledCells[row][col + i + 1] = prevCurrentId;
          }
          for (let i = 0; i < element.top; i++) {
            newFilledCells[row - i - 1][col] = prevCurrentId;
          }
          for (let i = 0; i < element.bottom; i++) {
            newFilledCells[row + i + 1][col] = prevCurrentId;
          }

          setCellColor((prevColors) => {
            const newColors = prevColors.map(row => [...row]);
            newColors[row][col] = color;
            for (let i = 0; i < element.left; i++) {
              newColors[row][col - i - 1] = color;
            }
            for (let i = 0; i < element.right; i++) {
              newColors[row][col + i + 1] = color;
            }
            for (let i = 0; i < element.top; i++) {
              newColors[row - i - 1][col] = color;
            }
            for (let i = 0; i < element.bottom; i++) {
              newColors[row + i + 1][col] = color;
            }
            return newColors;
          });

          setCurrentBlocks(prevBlocks => {
            const newBlocks = [...prevBlocks];
            const blockNames = Object.keys(BlockTypes);
            do {
              let randomNumber = Math.floor(Math.random() * blockNames.length)
              newBlocks[id] = blockNames[randomNumber];
            } while (prevBlocks[id] === newBlocks[id]);
            return newBlocks;
          });

          setCurrentColor((prevColor) => {
            const colorCycle = [
              "blue",
              "yellow",
              "green",
              "purple",
              "pink",
              "orange"
            ];
            const newColor = [...prevColor];
            do {
              let randomNumber = Math.floor(Math.random() * colorCycle.length)
              newColor[id] = colorCycle[randomNumber];
            } while (newColor[id] === prevColor[id]);
            return newColor;
          });

          return newFilledCells;
        }
        return prevFilledCells;
      });
      return prevCurrentId + 1;
    })
    setHoveredCells(Array.from({ length: 5 }, () => Array(5).fill(false)));
  }

  return (
    <div className="flex flex-wrap justify-around p-20">
      <div>
        <DraggableItem id="0" color={currentColor[0]} blockType={currentBlocks[0]} handleHover={handleHover} />
        <DraggableItem id="1" color={currentColor[1]} blockType={currentBlocks[1]} handleHover={handleHover} />
        <DraggableItem id="2" color={currentColor[2]} blockType={currentBlocks[2]} handleHover={handleHover} />
        <DraggableItem id="3" color={currentColor[3]} blockType={currentBlocks[3]} handleHover={handleHover} />
      </div>
      <DropGrid cellColor={cellColor} handleDrop={handleDrop} handleReset={handleReset} hoveredCells={hoveredCells} filledCells={filledCells} />
      <div>
        humble beginings, now i need to:
        display item on left,
        items on left start from center ? (try and error if fits, when center changes?, maybe create starting point and change it to the end? weird with T and L, maybe the method is flawed from the begining, because how will i highlight all 4 elements at once ????)
      </div>
    </div>
  );
};

export default DragAndDropComponent;
