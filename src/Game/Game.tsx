import { ReactElement, useState } from 'react'

interface Score {
  circle: number
  cross: number
}

type Turn = keyof Score

interface State {
  board: Array<'' | 'circle' | 'cross'>
  turn: Turn
  score: Score
}

const INITIAL_STATE: State = {
  board: ['', '', '', '', '', '', '', '', ''],
  score: {
    circle: 0,
    cross: 0
  },
  turn: 'circle'
}

const Game = (): ReactElement => {
  const [board, setBoard] = useState(INITIAL_STATE.board)
  const [score, setScore] = useState(INITIAL_STATE.score)
  const [turn, setTurn] = useState(INITIAL_STATE.turn)

  const nextTurn = (index: number): number => {
    if (board[index] !== '') return 0
    const nextBoard = board.map((item, bIndex) => index === bIndex ? turn : item)
    console.log(nextBoard)
    setBoard(nextBoard)
    if (winCondition(nextBoard)) {
      setBoard(INITIAL_STATE.board)
      setScore(p => ({
        ...p,
        [turn]: p[turn] + 1
      }))
    } else if (nextBoard.filter(item => item === '').length === 0) {
      alert('Remis')
      setBoard(INITIAL_STATE.board)
    }
    setTurn(p => p === 'circle' ? 'cross' : 'circle')
    return 0
  }

  return (
        <div className='app'>
            <div className='gridContainer'>
              { board.map((item, index) => <div className='gridCell' onClick={() => nextTurn(index)} key={index}>{item}</div>)}
            </div>
            <div>
            circle {score.circle} <br/>
            cross {score.cross}
        </div>
        </div>

  )
}

const winCondition = (board: string[]): boolean => {
  let isWon: boolean = false
  const conditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  conditions.forEach((item: number[]): void => {
    if (board[item[0]] === board[item[1]] && board[item[0]] === board[item[2]] && board[item[0]] !== '') {
      isWon = true
    }
  })
  return isWon
}

export default Game
