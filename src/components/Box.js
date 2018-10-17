import React from 'react'
import { css } from 'react-emotion';

const defaultBorder = '1px solid black';

const Box = ({
  firstColumn,
  firstRow,
  lastColumn,
  lastRow,
  size = 60,
}) => {
  const boxStyle = css({
    borderLeft: !firstColumn && defaultBorder,
    borderRight: !lastColumn && defaultBorder,
    borderTop: !firstRow && defaultBorder,
    borderBottom: !lastRow && defaultBorder,
    height: size,
    width: size,
  });
  return (
    <div className={boxStyle}>
    </div>
  )
};

export default Box;
