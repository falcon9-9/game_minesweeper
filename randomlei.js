const Line0 = (size, lei) => {
    let l = []
    for (let i = 0; i < size; i++) {
        l.push(0)
    }
    for (let i = 0; i < lei; i++) {
        l[i] = 9
    }
    return l
}

const square90 = (button) => {
    let x = Number(button.dataset.row)
    let y = Number(button.dataset.colum)
    let size = x * y
    let lei = Number(button.dataset.lei)

    let array = Line0(size, lei)
    let shuffled = shuffle(array)
    let square = a_to_s(shuffled, x, y)
    return square
}

const clonedSquare = (square0) => {
    let l = []
    for (let i = 0; i < square0.length; i++) {
        let line = square0[i]
        let c = line.slice(0)
        l.push(c)
    }
    return l
}

const plus1 = (square, x, y) => {
    let n = square.length
    let m = square[0].length
    if (x >= 0 && x < n && y >= 0 && y < m) {
        if (square[x][y] !== 9) {
            square[x][y] += 1
        }
    }
}

const markAround = (square, x, y) => {
    if (square[x][y] === 9) {
        plus1(square, x - 1, y - 1)
        plus1(square, x, y - 1)
        plus1(square, x + 1, y - 1)

        plus1(square, x - 1, y)
        plus1(square, x + 1, y)

        plus1(square, x - 1, y + 1)
        plus1(square, x, y + 1)
        plus1(square, x + 1, y + 1)
    }
}

const markedSquare = (square0) => {
    let square = clonedSquare(square0)
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        for (let j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    return square
}

const setleisquare = (button) => {
    let square0 = square90(button)
    return markedSquare(square0)
}

const shuffle =  (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = array[randomIndex];

        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    }
    return array
}

const getRenderSquare = (x, y) => {
    let cells = es('.cell')
    let array = []

    for (let i = 0; i < cells.length; i++) {
        let s = cells[i].dataset.number
        array.push(s)
    }
    let square = a_to_s(array, x, y)
    return square
}



