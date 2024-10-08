//-------------------------- Variables

let board
let youWin
let gameOver
let numberOfRows = 9
let numberOfColumns = 9
let numberOfCells = numberOfRows * numberOfColumns
let numberOfSkeletons = 10
let remainingSkeletons

//-------------------------- Cached Element References

const gameboardEl = document.querySelector("#gameboard")
const messageEl = document.querySelector("#winLoseMsg")
const skeleCountEl = document.querySelector("#skeletonCount")
const modalMenuEl = document.querySelector("#modalMenu")
const modalButtonEl = document.querySelector("#menuPlay")
const replayButtonEl = document.querySelector("#replay")
const difficultyButtonEls = document.querySelectorAll(".diffButton")

//-------------------------- Constants

const difficultySettings = {
    easy: {
        rows: 9,
        columns: 9,
        skeletons: 10,
    },
    medium: {
        rows: 16,
        columns: 16,
        skeletons: 40,
    },
    hard: {
        rows: 16,
        columns: 30,
        skeletons: 99,
    },
}

const ost = new Audio('./sounds/OBE-MoltenLava.mp3')
const click = new Audio('./sounds/click.wav')
const tombNoise = new Audio('./sounds/right-click.flac')
const scream = new Audio('./sounds/scream.wav')
const synthClick = new Audio('./sounds/synth-click.wav')
const success = new Audio('./sounds/success.ogg')

//-------------------------- Functions

const hideMenu = () => {
    modalMenu.style.display = "none"
    ost.voume = .05
    synthClick.play()
    ost.play()
    ost.loop = true
}

const resetVariables = () => {
    gameboardEl.innerHTML = ''
    board = []
    messageEl.textContent = ''
    youWin = false
    gameOver = false
    theMoon.style.display = "inline"
    theSun.style.display = "none"
    bloodMoon.style.display = "none"
    theSky.style.backgroundColor = "rgb(65, 90, 152)"
}

const generateBoard = () => {
    for (let i = 0; i < numberOfCells; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.id = i
        cell.style.height = `${100 / numberOfRows}%`
        cell.style.width = `${100 / numberOfColumns}%`
        const cellObj = {
            cell,
            isSkeleton: false,
            revealed: false,
            skeleCount: 0,
            tombstone: false,
            tombCount: 0,
            neighbours: [],
        }
        board.push(cellObj)
        gameboardEl.appendChild(cell)
    }
}

const createEventListeners = () => {
    board.forEach((square) => {
        square.cell.addEventListener('click', handleClick)
        square.cell.addEventListener('contextmenu', handleRightClick)
        square.cell.addEventListener('dblclick', handleDoubleClick)
    })
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

const updateCounter = () => {
    let skeleCount = numberOfSkeletons
    board.forEach((square) => {
        if (square.tombstone) {
            skeleCount --
        }
    })  
    skeleCountEl.textContent = skeleCount
}

const init = () => {
    resetVariables()
    generateBoard()
    createEventListeners()
    getNeighbours()
    placeSkeletons()
    calcNearbySkeletons()
    updateCounter()
}

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
            square.cell.classList.remove('tombstone')
            square.tombstone = false
            updateCounter()
            click.play()
        }
        if (square.revealed && square.skeleCount > 0 && !square.isSkeleton) {
            square.cell.innerHTML = square.skeleCount
        }
    })
}

const firstReveal = (idx) => {
    let firstClickCheck = 0
    board.forEach((square) => {
        if (!square.revealed) {
            firstClickCheck ++
        }
    })
    if (firstClickCheck < numberOfCells) {
        return;
    } else if (!board[idx].isSkeleton && board[idx].skeleCount === 0) {
        revealCell(idx)
    } else {
        init()
        firstReveal(idx)
    }
}

const checkGameOver = () => {
    board.forEach((square) => {
        if (square.isSkeleton && square.revealed) {
            gameOver = true
            //reveal all skeletons
            board.forEach((square) => {
                if (square.isSkeleton) {
                square.cell.classList.add('revealed')
            }
            //reveal all mistakes
            if (!square.isSkeleton && square.tombstone) {
                square.cell.classList.add('oops')
            }  
        })
        scream.play()
        bloodMoon.style.display = "inline"
        theMoon.style.display = "none"
        theSky.style.backgroundColor = "rgb(40, 56, 96)"
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
        success.play()
        theSun.style.display = "inline"
        theMoon.style.display = "none"
        theSky.style.backgroundColor = "rgb(71, 137, 170)"
        //assign tombstones to leftover skeletons
        board.forEach((square) => {
            if (square.isSkeleton && !square.tombstone) {
            square.tombstone = true
            square.cell.classList.add('tombstone')
            tombNoise.play()
        }
    })
        //make skeleCount 0
        updateCounter()
    }
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
    if (gameOver || youWin || board[evt.target.id].tombstone || board[evt.target.id].revealed) {
        return;
    } else {
        firstReveal(evt.target.id)
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
    tombNoise.play()
}

const updateTombCount = () => {
    board.forEach((square) => {
        square.tombCount = 0
        square.neighbours.forEach((neighbour) => {
            if (neighbour.tombstone) {
                square.tombCount ++
            }
        })
    })
}

const handleRightClick = (evt) => {
    evt.preventDefault()
    if (gameOver || youWin || board[evt.target.id].revealed) {
        return;
    } else {
    toggleTombstone(evt.target.id)
    }
    updateCounter()
    updateTombCount()
}

const replay = () => {
    synthClick.play()
    init()
}

const changeDifficulty = (evt) => {
    let setting = difficultySettings[evt.target.id]
    numberOfColumns = setting.columns
    numberOfRows = setting.rows
    numberOfSkeletons = setting.skeletons
    numberOfCells = numberOfRows * numberOfColumns
    gameboard.style.width = `${numberOfColumns * 30}px`
    gameboard.style.height = `${numberOfRows * 30}px`
    theSky.style.width = `${numberOfColumns * 30}px`
    synthClick.play()
    init()
}

const handleDoubleClick = (evt) => {
    let clicked = evt.target.id
    if (board[clicked].revealed && board[clicked].skeleCount === board[clicked].tombCount) {
        board[clicked].neighbours.forEach((neighbour) => {
            if (!neighbour.tombstone) {
                revealCell(neighbour.cell.id)
            }
        })
    }
    checkGameOver()
    checkWin()
    updateMessage()
}

init()

//-------------------------- Event Listeners

modalButtonEl.addEventListener('click', hideMenu)

replayButtonEl.addEventListener('click', replay)

difficultyButtonEls.forEach((difficultyButtonEl) => {
    difficultyButtonEl.addEventListener('click', changeDifficulty)
})
