import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { css } from 'react-emotion';

import Board from './components/Board';

const ROWS = 3;
const COLUMNS = 3;
const ROW_ARR = new Array(ROWS).fill('');
const COL_ARR = new Array(COLUMNS).fill('');
const GRID = ROW_ARR.map(x => COL_ARR.slice());

const appStyle = css({
  textAlign: 'center',
});

const winningString = 3;

const flattenAndFilterArrays = (grid) => {
  const output = [];
  grid.forEach(arr => {
    output.push(...arr);
  });
  return output.filter(el => !!el);
}

const mapGridIndexes = ({grid, value}) => {
  const mappedItems = grid.map((row, rowIndex) => row.map((col, colIndex) => {
    return col === value && {
      rowIndex,
      colIndex,
    }
  }))
  return flattenAndFilterArrays(mappedItems);
}

const diffRows = (item, arr) => {
  const lastItem = arr[arr.length - 1];
  return item.rowIndex - lastItem.rowIndex;
}

const diffCols = (item, arr) => {
  const lastItem = arr[arr.length - 1];
  return item.colIndex - lastItem.colIndex;
}

const compareToRest = ({currentItem, gridItems, winString}) => {
  const N = [currentItem];
  const NE = [currentItem];
  const E = [currentItem];
  const SE = [currentItem];
  const S = [currentItem];
  const SW = [currentItem];
  const W = [currentItem];
  const NW = [currentItem];

  const applyDirection = (item) => {
  
    if (diffRows(item, N) === 1 && diffCols(item, N) === 0) {
      N.push(item);
    } else if (diffRows(item, NE) === 1 && diffCols(item, NE) === 1) {
      NE.push(item);
    } else if (diffRows(item, E) === 0 && diffCols(item, E) === 1) {
      E.push(item);
    } else if (diffRows(item, SE) === -1 && diffCols(item, SE) === -1) {
      SE.push(item);
    } else if (diffRows(item, S) === -1 && diffCols(item, S) === 0) {
      S.push(item);
    } else if (diffRows(item, SW) === -1 && diffCols(item, SW) === -1) {
      SW.push(item);
    } else if (diffRows(item, W) === 0 && diffCols(item, W) === -1) {
      W.push(item);
    } else if (diffRows(item, NW) === 1 && diffCols(item, NW) === -1) {
      NW.push(item);
    }
  
    const arrays = [N, NE, E, SE, S, SW, W, NW];
    const winningArrays = arrays.filter(arr => arr.length >= winString);
    return winningArrays.length > 0;
  }

  let hasWon = false;
  let i = 0;

  while (i < gridItems.length && !hasWon) {
    hasWon = applyDirection(gridItems[i]);
    i += 1;
  }

  return hasWon;
}

const checkWin = ({ gridItems, winString }) => {
  let hasWon = false;
  let i = 0;
  while (i < gridItems.length && !hasWon) {
    hasWon = compareToRest({currentItem: gridItems[i], gridItems, winString});
    i++;
  }
  return hasWon;
};

class App extends Component {
  state = {
    currentValue: 'X',
    grid: cloneDeep(GRID),
  }

  handleClick = ({ columnIndex, rowIndex }) => {
    const {
      currentValue,
      grid,
    } = this.state;
    const clonedGrid = cloneDeep(grid);
    const nextValue = currentValue === 'X' ? 'O' : 'X';
    clonedGrid[rowIndex][columnIndex] = currentValue;
    const gridItems = mapGridIndexes({ grid: clonedGrid, value: currentValue });
    const hasWon = checkWin({ gridItems, winString: winningString });
    console.log({ hasWon });
    this.setState({
      currentValue: nextValue,
      grid: clonedGrid,
    });
  }

  render() {
    const { grid } = this.state;

    return (
      <div className={appStyle}>
        <h1>Tic Tac Toe</h1>
        <Board
          onClick={this.handleClick}
          rows={grid}
        />
      </div>
    );
  }
}

export default App;
