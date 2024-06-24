import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableColumn = ({ tableId, columnId, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: { tableId, columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '0.5rem',
        margin: '0.5rem',
        cursor: 'move',
        border: '1px solid gray',
        backgroundColor: 'white',
      }}
      data-columnid={columnId}
    >
      {children}
    </div>
  );
};

export default DraggableColumn;
