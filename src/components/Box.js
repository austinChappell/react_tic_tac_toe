import React from 'react'
import { css } from 'react-emotion';

const defaultBorder = '1px solid black';

const Box = ({
  columnIndex,
  firstColumn,
  firstRow,
  lastColumn,
  lastRow,
  onClick,
  rowIndex,
  size = 60,
  value,
}) => {
  const boxStyle = css({
    alignItems: 'center',
    borderLeft: !firstColumn && defaultBorder,
    borderRight: !lastColumn && defaultBorder,
    borderTop: !firstRow && defaultBorder,
    borderBottom: !lastRow && defaultBorder,
    display: 'flex',
    fontSize: size * 0.75,
    justifyContent: 'center',
    height: size,
    width: size,
  });
  const indexes = { columnIndex, rowIndex };
  return (
    <div
      className={boxStyle}
      onClick={() => {
        if (!value) {
          onClick(indexes)
        }
      }}
    >
      {value}
    </div>
  )
};

export default Box;
