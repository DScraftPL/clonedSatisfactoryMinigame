import { useDrop } from "react-dnd";

const ItemTypes = {
  BOX: "box",
};

const cellGridColor = (color) => {
  switch (color) {
    case "blue":
      return "bg-blue-500";
    case "yellow":
      return "bg-yellow-500";
    case "green":
      return "bg-green-500";
    case "purple":
      return "bg-violet-500";
    case "orange":
      return "bg-orange-500";
    case "pink":
      return "bg-pink-500";
    default:
      return "bg-gray-500";
  }
};



const CellGrid = ({ onDrop, row, col, color, isOverBlock, filledCells }) => {
  const borderTop = () => {
    if (filledCells[row][col] === 0) {
      return true;
    }
    if (row === 0) {
      return true;
    }
    if (filledCells[row][col] !== filledCells[row - 1][col]) {
      return true;
    } else {
      return false;
    }
  }

  const borderBottom = () => {
    if (filledCells[row][col] === 0) {
      return true;
    }
    if (row === 4) {
      return true;
    }
    if (filledCells[row][col] !== filledCells[row + 1][col]) {
      return true;
    } else {
      return false;
    }
  }

  const borderLeft = () => {
    if (filledCells[row][col] === 0) {
      return true;
    }
    if (col === 0) {
      return true;
    }
    if (filledCells[row][col] !== filledCells[row][col - 1]) {
      return true;
    } else {
      return false;
    }
  }

  const borderRight = () => {
    if (filledCells[row][col] === 0) {
      return true;
    }
    if (col === 4) {
      return true;
    }
    if (filledCells[row][col] !== filledCells[row][col + 1]) {
      return true;
    } else {
      return false;
    }
  }

  const isFilled = filledCells[row][col];
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => onDrop(row, col, item.color, item.id, item.blockType),
    hover: (item, monitor) => {
      if (monitor.isOver()) {
        item.onHover(row, col, item.blockType)
      } else {
        item.onHover(10, 10, item.blockType)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`aspect-square 
        ${borderTop() ? "border-t" : ""} 
        ${borderBottom() ? "border-b" : ""}
        ${borderLeft() ? "border-l" : ""}
        ${borderRight() ? "border-r" : ""}
        border-black h-full w-full transition-colors duration-200 ${(isOverBlock || isOver) ? isFilled ? "bg-red-500" : "bg-white" : cellGridColor(
        color
      )}`}
    ></div>
  );
};

const DropGrid = ({ handleDrop, cellColor, hoveredCells, filledCells, handleReset }) => {
  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-0 h-64 w-64">
        {Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <CellGrid
              color={cellColor[row][col]}
              key={`${row}-${col}`}
              onDrop={handleDrop}
              row={row}
              col={col}
              isOverBlock={hoveredCells[row][col]}
              filledCells={filledCells}
            />
          ))
        )}
      </div>
      <button onClick={handleReset}>Reset!</button>
    </div>
  );
};

export default DropGrid;
