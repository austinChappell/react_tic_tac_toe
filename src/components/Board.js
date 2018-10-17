import React from 'react';
import Row from './Row';

const Board = ({rows}) => (
  <div>
    {rows.map((row, index) => (
      <Row
        boxes={row}
        firstRow={index === 0}
        lastRow={index === rows.length - 1}
      />
    ))}
  </div>
);

export default Board;
