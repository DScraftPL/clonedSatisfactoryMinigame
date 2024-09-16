import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  BOX: 'box',
};

const DraggableItem = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '16px',
        backgroundColor: '#f4b400',
        marginBottom: '10px',
      }}
    >
      {name}
    </div>
  );
};

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => onDrop(item.name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        padding: '16px',
        height: '150px',
        width: '200px',
        backgroundColor: isOver ? '#34a853' : '#f1f1f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isOver ? 'Drop here!' : 'Drag item here'}
    </div>
  );
};

const DragAndDropComponent = () => {
  const handleDrop = (itemName) => {
    alert(`Dropped ${itemName}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div>
        <DraggableItem name="Item 1" />
        <DraggableItem name="Item 2" />
      </div>

      <DropZone onDrop={handleDrop} />
    </div>
  );
};

export default DragAndDropComponent;

