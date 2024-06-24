// src/TableList.js
import React from 'react';
import { useDrag } from 'react-dnd';

const TableList = ({ tables }) => {
  return (
    <div className="table-list">
      {tables.map((table) => (
        <DraggableTable key={table.id} table={table} />
      ))}
    </div>
  );
};

const DraggableTable = ({ table }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TABLE',
    item: table,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="table-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {table.name}
    </div>
  );
};

export default TableList;
