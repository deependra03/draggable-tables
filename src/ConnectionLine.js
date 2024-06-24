import React from 'react';

const ConnectionLine = ({ connections }) => {
  return (
    <svg className="connection-lines">
      {connections.map((conn, index) => (
        <line
          key={index}
          x1={conn.source.x}
          y1={conn.source.y}
          x2={conn.target.x}
          y2={conn.target.y}
          stroke="black"
        />
      ))}
    </svg>
  );
};

export default ConnectionLine;
