import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import Column from './Column';

const Table = ({ table, connections, setConnections, setGridTables }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TABLE',
    item: table,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = () => {
    setConnections(connections.filter(conn => conn.from.tableId !== table.id && conn.to.tableId !== table.id));
    setGridTables(tables => tables.filter(t => t.id !== table.id));
  };

  return (
    <div ref={drag} className="table" style={{ opacity: isDragging ? 0.5 : 1}}>
      <div className="table-header">
        <h4>{table.name}</h4>
      </div>
      <div className="table-body">
        {table.columns.map((column) => (
          <Column key={column.column_id} column={column} tableId={table.id} connections={connections} setConnections={setConnections} />
        ))}
      </div>
      <div className="table-footer">
        <button className="table-close-btn" onClick={handleRemove}>Remove ×</button>
      </div>
    </div>
    
  );
};

export default Table;

// import React from 'react';
// import DraggableColumn from './DraggableColumn';

// const Table = ({ table, onDragStart }) => {
//   return (
//     <div style={{ border: '1px solid black', margin: '1rem', padding: '1rem' }} data-gridid={table.id}>
//       <h3>{table.name}</h3>
//       <div>
//         {table.columns.map((column) => (
//           <DraggableColumn
//             key={column.column_id}
//             tableId={table.id}
//             columnId={column.column_id}
//             onDragStart={() => onDragStart(table.id, column)}
//           >
//             {column.name}
//           </DraggableColumn>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Table;
