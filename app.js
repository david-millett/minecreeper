//-------------------------- Constants

const board = []

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
        cell.innerText = i
        cell.id = i
        cell.style.height = `${100 / numberOfRows}%`
        cell.style.width = `${100 / numberOfColumns}%`
        const cellObj = {
            cell,
            isSkeleton: false,
            revealed: false,
            skeleCount: 0,
        }
        board.push(cellObj)
        gameboardEl.appendChild(cell)
    }
}

generateBoard()

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

placeSkeletons()


const calcNearbySkeletons = () => {
    board.forEach((square, index) => {      
        
        if (index > 0 && index % numberOfColumns !== 0 && board[index - 1].isSkeleton) {
            square.skeleCount ++
        } 

        if (index < numberOfCells && index % numberOfColumns !== numberOfColumns - 1 && board[index + 1].isSkeleton) {
            square.skeleCount ++
        }


        square.cell.innerHTML = square.skeleCount

    })
}

calcNearbySkeletons()

console.log(board)

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




