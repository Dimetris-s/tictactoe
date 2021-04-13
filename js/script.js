const CROSS_URL = '../img/cross.png'
const NULL_URL = '../img/null.png'
const _cells = document.querySelectorAll('td')
const restartButton = document.querySelector('.restart')
const winnerBlock = document.querySelector('.winner')

let playfield = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let crossPlayerTurn = true
let canTurn = true

_cells.forEach(cell => {
    cell.addEventListener('click', turn)
})

restartButton.onclick = restartGame

function changeTurn() {
    crossPlayerTurn = !crossPlayerTurn
}

function thereIsWinner() {
    if(playfield.some(row => row.every((cell,index, arr) => cell !== 0 && cell === arr[0]))) return true    // Проверка на горизонтальные линии
    for (let x = 0; x < 3; x++) {
        if(playfield.every(row => row[x] !== 0  && row[x] === playfield[0][0])) return true     // Проверка на вертикальные линии
    }
    if(
        playfield[1][1] !== 0 && 
        (
            (playfield[1][1] === playfield[0][0] && playfield[1][1] === playfield[2][2]) ||    //проверка на диагональные линии
            (playfield[1][1] === playfield[0][2] && playfield[1][1] === playfield[2][0])
        )
    ) return true
}

function restartGame() {
    _cells.forEach(cell => cell.style.backgroundImage = 'none')
    playfield = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    winnerBlock.style.display = 'none'
    crossPlayerTurn = true
    canTurn = true
    switchIconOfCurrentTurn()
}

function switchIconOfCurrentTurn() {
    const currentPlayerDisplay = document.querySelector('.turn-icon')
    currentPlayerDisplay.style.backgroundImage = `url(${crossPlayerTurn ? CROSS_URL : NULL_URL})`
}

function turn() {
    if(playfield[this.dataset.y][this.dataset.x] === 0 && canTurn) {
        this.style.backgroundImage = `url(${crossPlayerTurn ? CROSS_URL : NULL_URL})`
        this.style.opacity = 1
        playfield[this.dataset.y][this.dataset.x] = crossPlayerTurn ? 'X' : 'O'

        if(thereIsWinner()) {
            canTurn = false
            winnerBlock.style.display = 'block'
            winnerBlock.textContent = `Победили ${crossPlayerTurn ? 'Крестики' : 'Нолики'}!`
            return
        }

        changeTurn()
        switchIconOfCurrentTurn()
    }

}