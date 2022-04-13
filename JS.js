class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      board: null,
      gameOver: false,
      message: null
    };
    
    this.move = this.move.bind(this);
  }
  
  initBoard() {
    let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    board = this.placeNumbers(board);
    
    this.setState({
      board,
      gameOver: false,
      message: null
    });
  }
  
  placeNumbers(board) {
    const allCoordinates = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        allCoordinates.push([i, j]);
      }
    }
    
    const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    numbers.forEach(n => {
      const randomIndex = Math.floor(Math.random() * allCoordinates.length);
      const randomCoordinate = allCoordinates.splice(randomIndex, 1);
      board[randomCoordinate[0][0]][randomCoordinate[0][1]] = n;
    });
    
    return board;
  }

  move(r, c, value) {
    const board = this.state.board;
    
    // Move up
    if (board[r - 1] && board[r - 1][c] === 0) {
      board[r - 1][c] = value;
      board[r][c] = 0;
    }
    
    // Move right
    if (board[r][c + 1] === 0) {board
      board[r][c + 1] = value;
      board[r][c] = 0;
    }
    
    // Move down
    if (board[r + 1]) {
      if (board[r + 1][c] === 0) {
        board[r + 1][c] = value;
        board[r][c] = 0;
      }      
    }
    
    // Move left
    if (board[r][c - 1] === 0) {
      board[r][c - 1] = value;
      board[r][c] = 0;
    }
    
    if (this.checkComplete(board)) {
      this.setState({ board, gameOver: true, message: 'You win!' });
    } else {
      this.setState({ board });      
    }
  }
  
  checkComplete(board) {
    const finishedBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
    return JSON.stringify(finishedBoard) === JSON.stringify(board);
  }
  
  componentWillMount() {
    this.initBoard();
  }
  
  render() {
    return (
      <div>
        <div className="button" onClick={() => {this.initBoard()}}>New Game</div>
        
        <table>
          {this.state.board.map((row, i) => (<Row key={i} rowIndex={i} row={row} move={this.move} />))}
        </table>
        
        <p>{ this.state.message }</p>
      </div>
    );
  }
};

const Row = ({ row, rowIndex, move }) => {
  return (
    <tr>
      { row.map((cell, i) => <Cell key={i} rowIndex={rowIndex} columnIndex={i} cellValue={cell} move={move} />) }
    </tr>
  );
};

const Cell = ({ rowIndex, columnIndex, cellValue, move }) => {
  const value = (cellValue > 0) ? cellValue : null;
  
  return (
    <td>
      <div className="cell" onClick={() => {move(rowIndex, columnIndex, cellValue)}}>
        {value}
      </div>
    </td>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));
