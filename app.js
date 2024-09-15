//-------------------------- Constants


//-------------------------- Variables

let board
let youWin
let gameOver
let numberOfRows = 9
let numberOfColumns = 9
let numberOfCells = numberOfRows * numberOfColumns
let numberOfSkeletons = 10



//-------------------------- Cached Element References

const gameboardEl = document.querySelector("#gameboard")

const cellEls = []
 

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
            count: 0,
        }
        cellEls.push(cellObj)
        gameboardEl.appendChild(cell)
    }
}

generateBoard()

const placeSkeletons = () => {
    let skeletonsPlaced = 0
    while (skeletonsPlaced < numberOfSkeletons) {
        const placement = Math.floor(Math.random() * numberOfCells)
        if (!cellEls[placement].isSkeleton) {
            cellEls[placement].isSkeleton = true
            cellEls[placement].cell.classList.add("skeleton")
            cellEls[placement].cell.innerText = "X"
            skeletonsPlaced++
        }
        // console.log(placement)
    }
}

placeSkeletons()


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




