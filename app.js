//-------------------------- Constants

const board = []
console.log(board)

//-------------------------- Variables

let youWin
let gameOver

let numberOfRows = 9
let numberOfColumns = 9
let numberOfCells = numberOfRows * numberOfColumns
let numberOfSkeletons = 10
let remainingSkeletons = numberOfSkeletons

//-------------------------- Cached Element References

const gameboardEl = document.querySelector("#gameboard")
const messageEl = document.querySelector("#winLoseMsg")
const replayButton = document.querySelector("#replay")
const easyButton = document.querySelector("#easy")
const medButton = document.querySelector("#medium")
const hardButton = document.querySelector("#hard")

//-------------------------- Functions

const generateBoard = () => {
    for (let i = 0; i < numberOfCells; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.id = i
        // cell.style.height = `${100 / numberOfRows}%`
        // cell.style.width = `${100 / numberOfColumns}%`
        // gameboardEl.style.

        const cellObj = {
            cell,
            isSkeleton: false,
            revealed: false,
            skeleCount: 0,
            tombstone: false,
            neighbours: [],
        }
        board.push(cellObj)
        gameboardEl.appendChild(cell)
    }
}

const getNeighbours = () => {
    board.forEach((square, index) => {      

        //neighbour to left
        if (index > 0 && index % numberOfColumns !== 0) {
            square.neighbours.push(board[index - 1])
        } 
        
        //neighbour to right
        if (index < numberOfCells && index % numberOfColumns !== numberOfColumns - 1) {
            square.neighbours.push(board[index + 1])
        }
        
        //neighbour above
        if (index >= numberOfColumns) {
            square.neighbours.push(board[index - numberOfColumns])
        }

        //neighbour below
        if (index < numberOfCells - numberOfColumns) {
            square.neighbours.push(board[index + numberOfColumns])
        }

        //neighbour above left
        if (index > 0 && index >= numberOfColumns && index % numberOfColumns !== 0) {
            square.neighbours.push(board[index - numberOfColumns - 1])
        }

        //neighbour above right
        if (index < numberOfCells && index >= numberOfColumns && index % numberOfColumns !== numberOfColumns - 1) {
            square.neighbours.push(board[index - numberOfColumns + 1])
        }

        //neighbour below left
        if (index > 0 && index < numberOfCells - numberOfColumns && index % numberOfColumns !== 0) {
            square.neighbours.push(board[index + numberOfColumns - 1])
        } 

        //neighbour below right
        if (index < numberOfCells && index < numberOfCells - numberOfColumns && index % numberOfColumns !== numberOfColumns - 1) {
            square.neighbours.push(board[index + numberOfColumns + 1])
        }
    })
}

const placeSkeletons = () => {
    let skeletonsPlaced = 0
    while (skeletonsPlaced < numberOfSkeletons) {
        const placement = Math.floor(Math.random() * numberOfCells)
        if (!board[placement].isSkeleton) {
            board[placement].isSkeleton = true
            board[placement].cell.classList.add("skeleton")
            skeletonsPlaced++
        }
    }
}

const calcNearbySkeletons = () => {
    board.forEach((square) => {
        square.neighbours.forEach((neighbour) => {
            if (neighbour.isSkeleton) {
                square.skeleCount ++
            }
        })
    })
}

const init = () => {
    generateBoard()
    getNeighbours()
    placeSkeletons()
    calcNearbySkeletons()
    youWin = false
    gameOver = false
}

init()

const revealCell = (idx) => {
    board[idx].revealed = true
    if (board[idx].skeleCount === 0 && !board[idx].isSkeleton) {
        board[idx].neighbours.forEach((neighbour) => {
            if (!board[neighbour.cell.id].revealed) {
            revealCell(neighbour.cell.id)
        }
        })
    }
    board.forEach((square) => {
        if (square.revealed) {
            square.cell.classList.add('revealed')
        }
        if (square.revealed && square.skeleCount > 0 && !square.isSkeleton) {
            square.cell.innerHTML = square.skeleCount
        }
    })
}

const checkWin = () => {
    let winCheck = 0
    board.forEach((square) => {
        if (square.revealed || square.isSkeleton) {
            winCheck ++
        }
    })
    if (winCheck === numberOfCells) {
        youWin = true
    }
}

const checkGameOver = () => {
    board.forEach((square) => {
        if (square.isSkeleton && square.revealed) {
            
            gameOver = true

            board.forEach((square) => {
                if (square.isSkeleton) {
                square.cell.classList.add('revealed')
            }
        })
        }
    })
}

const updateMessage = () => {
    if (gameOver) {
        messageEl.textContent = "You died..."
    }
    
    if (youWin) {
        messageEl.textContent = "Well done!"
    }
}

const handleClick = (evt) => {
    if (gameOver || youWin || board[evt.target.id].tombstone) {
        return;
    } else {
    revealCell(evt.target.id)
    checkGameOver()
    checkWin()
    updateMessage()
    }
}

const toggleTombstone = (idx) => {
    board[idx].cell.classList.toggle('tombstone')
    if (board[idx].cell.classList.contains('tombstone')) {
        board[idx].tombstone = true
    } else {
        board[idx].tombstone = false
    }
}


const handleRightClick = (evt) => {
    evt.preventDefault()
    if (gameOver || youWin) {
        return;
    } else {
    toggleTombstone(evt.target.id)
}}

const reset = () => {
    
}

const replay = () => {
    reset()
    init()
}

//-------------------------- Event Listeners


board.forEach((square) => {
    square.cell.addEventListener('click', handleClick)
    square.cell.addEventListener('contextmenu', handleRightClick)
})

replayButton.addEventListener('click', replay)


//-------------------------- Old/replaced code

//create a board - this should be an array within an array and create a grid visible on the screen
// const generateBoard = () => {
//     const board = []
//     for (let x = 0; x < numberOfRows; x++) {
//         const row = []
//         for (let y = 0; y < numberOfColumns; y++) {
//             const cellElement = document.createElement("div")
//             cellElement.className = "cell"
//             const cell = {
//                 x,
//                 y
//             }
//             row.push(cell)
//             gameboardEl.appendChild(cellElement)
//         }
//         board.push(row)
//     }
//     return board
// }


//-------------------------- Event Listeners

// const calcNearbySkeletons = () => {
//     board.forEach((square, index) => {      

//         //count square to left
//         if (index > 0 && index % numberOfColumns !== 0 && board[index - 1].isSkeleton) {
//             square.skeleCount ++
//         } 
        
//         //count square to right
//         if (index < numberOfCells && index % numberOfColumns !== numberOfColumns - 1 && board[index + 1].isSkeleton) {
//             square.skeleCount ++
//         }
        
//         //count square above
//         if (index > numberOfColumns && board[index - numberOfColumns].isSkeleton) {
//             square.skeleCount ++
//         }

//         //count square below
//         if (index < numberOfCells - numberOfColumns && board[index + numberOfColumns].isSkeleton) {
//             square.skeleCount ++
//         }

//         //count square above left
//         if (index > 0 && index > numberOfColumns && index % numberOfColumns !== 0 && board[index - numberOfColumns - 1].isSkeleton) {
//             square.skeleCount ++
//         }

//         //count square above right
//         if (index < numberOfCells && index > numberOfColumns && index % numberOfColumns !== numberOfColumns - 1 && board[index - numberOfColumns + 1].isSkeleton) {
//             square.skeleCount ++
//         }

//         //count square below left
//         if (index > 0 && index < numberOfCells - numberOfColumns && index % numberOfColumns !== 0 && board[index + numberOfColumns - 1].isSkeleton) {
//             square.skeleCount ++
//         } 

//         //count square below right
//         if (index < numberOfCells && index < numberOfCells - numberOfColumns && index % numberOfColumns !== numberOfColumns - 1 && board[index + numberOfColumns + 1].isSkeleton) {
//             square.skeleCount ++
//         }
      
//         if (square.skeleCount > 0 && !square.isSkeleton) {
//         square.cell.innerHTML = square.skeleCount
//         } else {
//             // square.cell.innerHTML = ''
//         }

// // if square.skeleCount remove it

//     })
// }


