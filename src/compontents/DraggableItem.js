import { useDrag } from "react-dnd";

const ItemTypes = {
  BOX: "box",
};

const DraggableItem = ({ id, color, blockType, handleHover }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, color, blockType, onHover: handleHover },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        if (!monitor.didDrop()) {
          handleHover(10, 10, item.blockType);
        }
      },
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

export default DraggableItem
