import React, { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Xarrow from "react-xarrows";

const Column = ({ column, tableId, connections, setConnections }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COLUMN',
    item: { column, tableId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN',
    drop: (item) => createConnection(item, { column, tableId }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const createConnection = (from, to) => {
    console.log("@@from", from);
    console.log("@@to", to);
    if (!connections.some(conn => conn.from.column.column_id === from.column.column_id && conn.to.column.column_id === to.column.column_id)) {
      setConnections([...connections, { from, to }]);
    }
  };

  useEffect(() => {
    // This will run after every render to refresh the arrows
  }, [connections]);

  return (
    <>
      <div
        ref={(node) => drag(drop(node))}
        className="column"
        id={column.column_id}
        data-columnid={column.column_id}
        style={{ opacity: isDragging ? 0.5 : 1, background: isOver ? '#e0e0e0' : '#f0f0f0' }}
      >
        <span>{column.name}</span>
        <span>{column.column_data_type}</span>
      </div>
      {connections.map((conn, index) => (
        <Xarrow
          key={index}
          start={conn.from.column.column_id}
          end={conn.to.column.column_id}
        />
      ))}
    </>
  );
};

export default Column;
