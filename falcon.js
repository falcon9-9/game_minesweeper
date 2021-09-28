const log = console.log.bind(console)

const e = (selector) => {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector}`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = (selector) => {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了`
        alert(s)
        return []
    } else {
        return elements
    }
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const removeClassAll = (className) => {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const bindAll = (selector, eventName, callback) => {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const closestClass = (element, className) => {
    let e = element
    while (e !== null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

const closestId = (element, idName) => {
    let e = element
    while (e !== null) {
        if (e.id === idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

const closestTag = (element, tagName) => {
    let e = element
    while (e !== null) {
        if (e.tagName.toUpperCase() === tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

const closest = (element, selector) => {
    let c = selector[0]
    if (c === '.') {
        let className = selector.slice(1)
        return closestClass(element, className)
    } else if (c === '#') {
        let idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        let tagName = selector
        return closestTag(element, tagName)
    }
}

const s_to_a = (square) => {
    let array = []
    for (let i = 0; i < square.length; i++) {
        let s1 = square[i]
        let s1len = square[i].length
        for (let j = 0; j < s1len; j++) {
            let a = s1[j]
            array.push(a)
        }
    }
    return array

}

const a_to_s = (array, x, y) => {
    let square = []
    let len = array.length
    for (let i = 0; i < x; i++) {
        square.push([])
        for (let j = y * i; j < y * i + y; j++) {
            let s = square[i]
            let a = array[j]
            s.push(a)
        }
    }
    return square
}


