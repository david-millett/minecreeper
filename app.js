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



//-------------------------- Cached Element References

const gameboardEl = document.querySelector("#gameboard")





 

//-------------------------- Functions

const generateBoard = () => {
    for (let i = 0; i < numberOfCells; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.innerText = '/'

        cell.id = i
        cell.style.height = `${100 / numberOfRows}%`
        cell.style.width = `${100 / numberOfColumns}%`
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
        if (index > numberOfColumns) {
            square.neighbours.push(board[index - numberOfColumns])
        }

        //neighbour below
        if (index < numberOfCells - numberOfColumns) {
            square.neighbours.push(board[index + numberOfColumns])
        }

        //neighbour above left
        if (index > 0 && index > numberOfColumns && index % numberOfColumns !== 0) {
            square.neighbours.push(board[index - numberOfColumns - 1])
        }

        //neighbour above right
        if (index < numberOfCells && index > numberOfColumns && index % numberOfColumns !== numberOfColumns - 1) {
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
            board[placement].cell.innerText = "X"
            skeletonsPlaced++
        }
        // console.log(placement)
    }
}

const calcNearbySkeletons = () => {
    board.forEach((square) => {
        square.neighbours.forEach((neighbour) => {
            if (neighbour.isSkeleton) {
                square.skeleCount ++
            }
            if (square.skeleCount > 0 && !square.isSkeleton) {
                square.cell.innerHTML = square.skeleCount
            }
        })
    })
}

const renderBoard = () => {
    generateBoard()
    getNeighbours()
    placeSkeletons()
    calcNearbySkeletons()
}

renderBoard()

const revealCell = (idx) => {
    board[idx].revealed = true
    if (board[idx].skeleCount === 0) {

        board[idx].neighbours.forEach((neighbour) => {
            if (!board[neighbour.cell.id].revealed) {
            revealCell(neighbour.cell.id)
            console.log(neighbour.cell.id)
        }
        })
    }
    board.forEach((square) => {
        if (square.revealed) {
            square.cell.classList.add('revealed')
        }
    })
}

const handleClick = (evt) => {
    revealCell(evt.target.id)
}

//add neightbours to object... use index... step 1 idewntify empty cells then do recursion

//-------------------------- Event Listeners


board.forEach((square) => {
    square.cell.addEventListener('click', handleClick)
})






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


