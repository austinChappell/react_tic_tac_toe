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
}) => (
  <div className={rowStyle}>
    {boxes.map((box, index) => (
      <Box
        firstColumn={index === 0}
        firstRow={firstRow}
        lastColumn={index === boxes.length - 1}
        lastRow={lastRow}
        size={100}
      />
    ))}
  </div>
);

export default Row;
