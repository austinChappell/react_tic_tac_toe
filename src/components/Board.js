import React from 'react';
import Row from './Row';

const Board = ({
  onClick,
  rows,
}) => (
  <div>
    {rows.map((row, index) => (
      <Row
        key={index}
        boxes={row}
        firstRow={index === 0}
        lastRow={index === rows.length - 1}
        onClick={onClick}
        rowIndex={index}
      />
    ))}
  </div>
);

export default Board;
