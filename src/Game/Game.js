import {useState} from 'react'

const INITIAL_STATE = {
    board: ['','','','','','','','','',],
    score: {
        circle: 0,
        cross: 0,
    },
    turn: 'circle',
}

const Game = () => {
    // const [gameState, setGameState] = useState(INITIAL_STATE)
    const [board, setBoard] = useState(INITIAL_STATE.board)
    const [score, setScore] = useState(INITIAL_STATE.score)
    const [turn, setTurn] = useState(INITIAL_STATE.turn)

    const nextTurn = (index) => {
        if (board[index]) return
        const nextBoard = board.map((item, bIndex) => bIndex === index ? turn : item)
        setBoard(nextBoard)

        if(nextBoard.filter(item => item === '').length === 0 ) {
            alert('Remis')
            setBoard(INITIAL_STATE.board)
            return
        }
        else if(winCondition(nextBoard)) {
            setScore(p => {
                return {
                    ...p,
                    [turn]: p[turn] + 1
                }
            })
            setBoard(INITIAL_STATE.board)
            alert(`Gierke wygral ${turn}`)
            return
        }
        console.log(score);

        
        setTurn(turn => turn === 'circle' ? 'cross' : 'circle')
        console.log(board)
    }

    
    return(
        <div>
            <div className="grid-container">
                {board.map((sym, index) => <div className="grid-cell" onClick={() => nextTurn(index) } key={index} >{sym}</div>)}
            </div>
            <div>
                circle: { score.circle } <br/>
                cross: {score.cross }
            </div>
        </div>
    )


}

const winCondition = (board) => {
    let isWon = false
    let cases =  [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    cases.forEach(cond => {
        if (board[cond[0]] === board[cond[1]] && board[cond[0]] === board[cond[2]] &&
            board[cond[0]] !== '' &&
            board[cond[1]] !== '' &&
            board[cond[2]] !== ''){
                isWon = true
            }
    })
    return isWon
}
    

export default Game