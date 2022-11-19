import { ReactElement, useState } from 'react'
import './Game.css'

interface Score {
  o: number
  x: number
}

type Turn = keyof Score

type History = Array<'remis' | 'o' | 'x'>

interface State {
  board: Array<'' | 'o' | 'x'>
  turn: Turn
  score: Score
  matchHistory: History
}

const INITIAL_STATE: State = {
  board: ['', '', '', '', '', '', '', '', ''],
  score: {
    o: 0,
    x: 0
  },
  turn: 'o',
  matchHistory: []
}

// const HISTORY_DEBUG: History = ['remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis', 'remis']

const Game = (): ReactElement => {
  const [board, setBoard] = useState(INITIAL_STATE.board)
  const [score, setScore] = useState(INITIAL_STATE.score)
  const [turn, setTurn] = useState(INITIAL_STATE.turn)
  const [matchHistory, setMatchHistory] = useState(INITIAL_STATE.matchHistory)

  const nextTurn = (index: number): number => {
    if (board[index] !== '') return 0
    const nextBoard = board.map((item, bIndex) => index === bIndex ? turn : item)
    setBoard(nextBoard)
    if (winCondition(nextBoard)) {
      setBoard(INITIAL_STATE.board)
      setScore(p => ({
        ...p,
        [turn]: p[turn] + 1
      }))
      alert(`Wygral ${turn}`)
      setMatchHistory(p => ([...p, turn]))
    } else if (nextBoard.filter(item => item === '').length === 0) {
      alert('Remis')
      setMatchHistory(p => ([...p, 'remis']))
      setBoard(INITIAL_STATE.board)
    }
    setTurn(p => p === 'o' ? 'x' : 'o')
    return 0
  }

  return (
        <div className='Game'>
            <div className='gridContainer'>
              { board.map((item, index) => <div className='gridCell' onClick={() => nextTurn(index)} key={index}>{item}</div>)}
            </div>
            <div className='score'>
              <span>circle: {score.o}</span>
              <span>cross: {score.x}</span>
            </div>
            <div className='history'>
              {matchHistory.map((match, index) => <div key={index}>{index + 1}: {match}</div>)}
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
