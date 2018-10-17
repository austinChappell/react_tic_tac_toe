import React from 'react';
import { css } from 'react-emotion';

import Box from './Box';

const rowStyle = css({
  display: 'flex',
  justifyContent: 'center',
});

const Row = ({
  boxes,
  firstRow,
  lastRow,
  onClick,
  rowIndex,
}) => (
  <div className={rowStyle}>
    {boxes.map((box, index) => (
      <Box
        columnIndex={index}
        key={index}
        firstColumn={index === 0}
        firstRow={firstRow}
        lastColumn={index === boxes.length - 1}
        lastRow={lastRow}
        onClick={onClick}
        rowIndex={rowIndex}
        size={100}
        value={box}
      />
    ))}
  </div>
);

export default Row;
