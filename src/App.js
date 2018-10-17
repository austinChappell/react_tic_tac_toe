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

class App extends Component {
  state = {
    currentValue: 'X',
    grid: cloneDeep(GRID),
  }

  handleClick = ({ columnIndex, rowIndex }) => {
    console.log('clicked', columnIndex, rowIndex);
    const {
      currentValue,
      grid,
    } = this.state;
    const clonedGrid = cloneDeep(grid);
    const nextValue = currentValue === 'X' ? 'O' : 'X';
    clonedGrid[rowIndex][columnIndex] = currentValue;
    this.setState({
      currentValue: nextValue,
      grid: clonedGrid,
    });
  }

  render() {
    const { grid } = this.state;
    console.log(grid);

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
