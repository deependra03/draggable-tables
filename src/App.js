import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableList from './TableList';
import GridArea from './GridArea';
import { tables } from './data';
import './App.css';

const App = () => {
  const [gridTables, setGridTables] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="left-panel">
          <input
            type="text"
            placeholder="Filter by Table Name"
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          <TableList tables={filteredTables} />
          <button className="browse-button">Browse Workbooks</button>
        </div>
        <div className="right-panel">
          <GridArea gridTables={gridTables} setGridTables={setGridTables} />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
