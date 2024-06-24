import React, { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import GridLayout from 'react-grid-layout';
import Table from './Table';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const GridArea = ({ gridTables, setGridTables }) => {
  const [connections, setConnections] = useState([]);
  const gridRef = useRef();

  const [{ isOver }, drop] = useDrop({
    accept: 'TABLE',
    drop: (item) => addTableToGrid(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addTableToGrid = (table) => {
    if (!gridTables.some((t) => t.id === table.id)) {
      setGridTables([...gridTables, { ...table, x: 0, y: Infinity, w: 2, h: 2 }]);
    } else {
      alert('Table already exists in the grid.');
    }
  };

  const layout = gridTables.map((table) => ({
    i: table.id,
    x: table.x,
    y: table.y,
    w: table.w,
    h: table.h,
  }));

  const findColumnPosition = (tableId, columnId) => {
    const tableElement = document.querySelector(`[data-gridid='${tableId}']`);
    if (tableElement) {
      const columnElement = tableElement.querySelector(`[data-columnid='${columnId}']`);
      if (columnElement) {
        const tableRect = tableElement.getBoundingClientRect();
        const columnRect = columnElement.getBoundingClientRect();
        return {
          x: columnRect.left - tableRect.left + columnRect.width / 2,
          y: columnRect.top - tableRect.top + columnRect.height / 2,
        };
      }
    }
    return null;
  };

//   const drawConnections = () => {
//     return connections.map((conn, index) => {
//       const fromPos = findColumnPosition(conn.from.tableId, conn.from.column.column_id);
//       const toPos = findColumnPosition(conn.to.tableId, conn.to.column.column_id);
      
//       if (fromPos && toPos) {
//         return (
//           <line
//             key={index}
//             x1={fromPos.x}
//             y1={fromPos.y}
//             x2={toPos.x}
//             y2={toPos.y}
//             stroke="red"
//             strokeWidth="2"
//           />
//         );
//       }
//       return null;
//     });
//   };

  useEffect(() => {
    const handleScroll = () => {
      // Force re-render to update the positions of the lines
      setConnections((prevConnections) => [...prevConnections]);
    };

    const gridElement = gridRef.current;

    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
      return () => gridElement.removeEventListener('scroll', handleScroll);
    }
  }, [connections]);

  return (
    <div className="grid-area" ref={drop} style={{ background: isOver ? '#e0ffe0' : '#fff' }}>
      <div ref={gridRef}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={(newLayout) => {
            // Handle layout change
            const updatedTables = newLayout.map((l) => {
              const table = gridTables.find((t) => t.id === l.i);
              return {
                ...table,
                x: l.x,
                y: l.y,
                w: l.w,
                h: l.h,
              };
            });
            setGridTables(updatedTables);
          }}
        >
          {gridTables.map((table) => (
            <div key={table.id} data-grid={{ i: table.id, x: table.x, y: table.y, w: table.w, h: table.h }} data-gridid={table.id}>
              <Table table={table} connections={connections} setConnections={setConnections} setGridTables={setGridTables} />
            </div>
          ))}
        </GridLayout>
        {/* <svg className="connections" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          {drawConnections()}
        </svg> */}
      </div>
    </div>
  );
};

export default GridArea;
