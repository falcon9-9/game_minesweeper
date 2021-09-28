// 生成格子，渲染到页面上
const templateCell = (line, x) => {
    let s = ''
    for (let i = 0; i < line.length; i++) {
        let e = `${line[i]}`
        s += `<div class="cell" data-number=${e} data-x='${x}' data-y='${i}'>${e}</div>`
    }
    return s
}

const templateRow = (square) => {
    let s = ''
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        let row = templateCell(line, i)
        s += `<div class="row inline-block-row">${row}</div>`
    }
    return s
}

const renderSquare = (square) => {
    let silei = templateRow(square)
    let container = e('#id-div-mime')
    container.innerHTML = silei
}

// 游戏失败
const alert = (title, message) => {
    let div = e('.modal-alert')
    let alert = `<div class="modal-alert-title">${title}</div>
        <div class="modal-alert-message">${message}</div>
        <button class="button-re" id="id-button1-re">RESTART</button>
    `
    div.innerHTML = alert
}

const nowAlert = () => {
    let container = e('.modal-container')
    container.classList.remove('hide')
    alert('YOU LOSE', 'You’ve almost got it.')
    bindClickRe()

    let mime = e('#id-div-mime')
    let clock = Number(mime.dataset.clock)
    clearInterval(clock)
}

const bindClickRe = (callback) => {
    let button = e('#id-button1-re')
    button.addEventListener('click', () => {
        let container = e('.modal-container')
        container.classList.add('hide')
    })
    
}

// 计时
const changesecond = (second) => {
    let secondint = parseInt(second)
    let minute = Math.floor(second / 60)
    let second2 = secondint - minute * 60
    let before = `0${minute}`.slice(-2)
    let after = `0${second2}`.slice(-2)
    return `${before}:${after}`
}

// 开始
const bindEventStart = () => {
    let button = 'button'
    let minesweeper = e('#minesweeper')
    let container = e('#id-div-mime')
    bindAll(button, 'click', (event) => {
        let timer = e('.timer')
        timer.innerHTML = '00:00'
        container.classList.remove('clicked')
        container.classList.remove('gameover')
        let todelete = minesweeper.dataset.todelete
        removeClassAll(todelete)

        let self = event.target
        let level = self.dataset.level
        let classname = `${level}`
        minesweeper.classList.add(classname)
        minesweeper.dataset.todelete = classname

        let lei = self.dataset.lei
        let minecount = e('.mine-count')
        minecount.innerHTML = `0${lei}`

        let square = setleisquare(self)

        renderSquare(square)
    })
}
// 点击格子
const bindEventDelegate = () => {
    let container = e('#id-div-mime')
    container.addEventListener('click', (event) => {
        let minesweeper = e('#minesweeper')
        let level = minesweeper.dataset.todelete
        let idname = `#id-button-${level}`
        let button = e(idname)
        let row = Number(button.dataset.row)
        let colum = Number(button.dataset.colum)

        let self = event.target
        if (self.classList.contains('cell') && closestClass(self, 'gameover') === null) {
            if (closestClass(self, 'clicked') === null) {

                let timer = e('.timer')

                let interval = 1000
                let now = 0
                let clockId = setInterval(() => {
                    timer.innerHTML = `${changesecond(now += 1)}`
                }, interval)
                container.dataset.clock = clockId

                container.classList.add('clicked')
                let x1 = Number(self.dataset.x)
                let y1 = Number(self.dataset.y)
                self.innerHTML = '0'
                self.dataset.number = '0'

                let square = getRenderSquare(row, colum)
                while (square[x1][y1] !== 0) {
                    square = setleisquare(button)
                }
                renderSquare(square)
                vjkl(self, square)
            } else {
                let square = getRenderSquare(row, colum)
                vjkl(self, square)
            }
        }

    })
}
// 展开格子
const vjkl = (cell, square) => {
    let container = e('#id-div-mime')

    if (!cell.classList.contains('opened')) {
        if (cell.dataset.number === '9') {
            let container = closestId(cell, 'id-div-mime')
            container.classList.add('gameover')
            let rest = es('[data-number="9"]')
            for (let n of rest) {
                n.classList.add('opened_9')
            }
            // 游戏失败
            nowAlert()
        } else if (cell.dataset.number === '0') {

            let x = Number(cell.dataset.x)
            let y = Number(cell.dataset.y)
            let ele = e(`[data-x='${x}'][data-y='${y}']`)
            ele.classList.add('opened_0')
            vjklAround(square, x, y)
        } else {
            cell.classList.add('opened')
        }
    }
}

const vjklAround = (square, x, y) => {
    vjkl1(square, x - 1, y - 1)
    vjkl1(square, x, y - 1)
    vjkl1(square, x + 1, y - 1)

    vjkl1(square, x - 1, y)
    vjkl1(square, x + 1, y)

    vjkl1(square, x - 1, y + 1)
    vjkl1(square, x, y + 1)
    vjkl1(square, x + 1, y + 1)
}

const vjkl1 = (square, x, y) => {
    if (x >= 0 && x < square.length && y >= 0 && y < square[0].length) {
        let ele = e(`[data-x='${x}'][data-y='${y}']`)
        if (!ele.classList.contains('opened') && !ele.classList.contains('opened_0')) {
            let num = ele.dataset.number
            if (num === '0') {
                ele.classList.add('opened_0')
                vjklAround(square, x, y)
            } else if (num !== '9') {
                ele.classList.add('opened')
            }
        }
    }
}

const __main = () => {
    bindEventStart()
    bindEventDelegate()
}

__main()


