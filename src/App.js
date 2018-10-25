import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { css } from 'react-emotion';

import Board from './components/Board';

const ROWS = 3;
const COLUMNS = 3;
const ROW_ARR = new Array(ROWS).fill('');
const COL_ARR = new Array(COLUMNS).fill('');
const GRID = ROW_ARR.map(x => COL_ARR.slice());
const MIN_TO_WIN = 3;
const INITIAL_STATE = {
  currentValue: 'X',
  grid: cloneDeep(GRID),
  hasWon: false,
  hasWonMessage: null,
};

const appStyle = css({
  textAlign: 'center',
});

const diffCols = ({ arr, item }) => {
  const lastItem = arr[arr.length - 1];
  return item.colIndex - lastItem.colIndex;
};

const diffRows = ({ arr, item }) => {
  const lastItem = arr[arr.length - 1];
  return item.rowIndex - lastItem.rowIndex;
}

const compareToRest = ({ currentItem, gridItems, winString }) => {
  const N = [currentItem];
  const NE = [currentItem];
  const E = [currentItem];
  const SE = [currentItem];
  const S = [currentItem];
  const SW = [currentItem];
  const W = [currentItem];
  const NW = [currentItem];

  const applyDirection = (item) => {
    if (diffRows({ arr: N, item }) === 1 && diffCols({ arr: N, item }) === 0) {
      N.push(item);
    } else if (diffRows({ arr: NE, item }) === 1 && diffCols({ arr: NE, item }) === 1) {
      NE.push(item);
    } else if (diffRows({ arr: E, item }) === 0 && diffCols({ arr: E, item }) === 1) {
      E.push(item);
    } else if (diffRows({ arr: SE, item }) === -1 && diffCols({ arr: SE, item }) === 1) {
      SE.push(item);
    } else if (diffRows({ arr: S, item }) === -1 && diffCols({ arr: S, item }) === 0) {
      S.push(item);
    } else if (diffRows({ arr: SW, item }) === -1 && diffCols({ arr: SW, item }) === -1) {
      SW.push(item);
    } else if (diffRows({ arr: W, item }) === 0 && diffCols({ arr: W, item }) === -1) {
      W.push(item);
    } else if (diffRows({ arr: NW, item }) === 1 && diffCols({ arr: NW, item }) === -1) {
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
    i++;
  }

  return hasWon;
}

const flattenAndFilterArrays = (grid) => {
  const output = [];
  grid.forEach(arr => {
    output.push(...arr);
  });
  return output.filter(box => !!box);
}

const mapGridIndexes = ({ grid, value }) => {
  const mappedItems = grid.map((row, rowIndex) => row.map((col, colIndex) => {
      return col === value && {
        colIndex,
        rowIndex,
      }
    })
  )
  return flattenAndFilterArrays(mappedItems);
}

const checkWin = ({ gridItems, winString }) => {
  let hasWon = false;
  let i = 0;
  while (i < gridItems.length && !hasWon) {
    hasWon = compareToRest({ currentItem: gridItems[i], gridItems, winString });
    i++;
  }
  return hasWon;
}

class App extends Component {
  state = cloneDeep(INITIAL_STATE);

  handleClick = ({ columnIndex, rowIndex }) => {
    const {
      currentValue,
      grid,
      hasWon: gameOver,
    } = this.state;
    if (!gameOver) {
      const clonedGrid = cloneDeep(grid);
      const nextValue = currentValue === 'X' ? 'O' : 'X';
      clonedGrid[rowIndex][columnIndex] = currentValue;
      const gridItems = mapGridIndexes({ grid: clonedGrid, value: currentValue });
      const hasWon = checkWin({ gridItems, winString: MIN_TO_WIN });
      this.setState({
        currentValue: nextValue,
        grid: clonedGrid,
        hasWon,
        hasWonMessage: hasWon ? `Player ${currentValue} has won!` : null,
      });
    }
  }

  render() {
    const {
      grid,
      hasWon,
      hasWonMessage,
    } = this.state;

    return (
      <div className={appStyle}>
        <h1>Tic Tac Toe</h1>
        <Board
          onClick={this.handleClick}
          rows={grid}
        />

        <button
          onClick={() => this.setState(cloneDeep(INITIAL_STATE))}
        >
          Reset
        </button>

        {hasWon && (
          <h2>
            {hasWonMessage}
          </h2>
        )}

      </div>
    );
  }
}

export default App;
