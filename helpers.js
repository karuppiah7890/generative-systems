function hexagon(posX, posY, radius) {
    const rotAngle = 360 / 6
    beginShape()
    for(let i=0; i<6; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i*rotAngle)
        vertex(thisVertex.x, thisVertex.y)
    }
    endShape(CLOSE)
}

function myTriangle(posX, posY, radius, direction) {
    if(direction) {
        beginShape()
        vertex(posX + radius * cos(0), posY + radius * sin(0))
        vertex(posX + radius * cos(120), posY + radius * sin(120))
        vertex(posX + radius * cos(240), posY + radius * sin(240))
        endShape(CLOSE)
    } else {
        beginShape()
        vertex(posX + radius * cos(180), posY + radius * sin(180))
        vertex(posX + radius * cos(300), posY + radius * sin(300))
        vertex(posX + radius * cos(60), posY + radius * sin(60))
        endShape(CLOSE)
    }
}

function pointOnCircle(posX, posY, radius, angle) {
    const x = posX + radius*cos(angle)
    const y = posY + radius*sin(angle)
    return createVector(x, y)
}


function randomSelectTwo() {
    const rando = random(1)
    if(rando > 0.5) {
        return true
    } else {
        return false
    }
}

function getRandomFromPallete() {
    const randomColorIndex = floor(random(0, PALETTE.length))
    return PALETTE[randomColorIndex]
}

function testLines() {
    let numberOfShapes = randomSelectTwo() ? SIDES : SIDES*2
    let strokeColor = getRandomFromPallete()
    noFill()
    let angle = 360 / numberOfShapes
    push()
        translate(width/2, height/2)
        stroke(PALETTE[0])
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
        stroke(strokeColor)
        for(let i=0; i<numberOfShapes; i++) {
            line(0, 0, 0, CRYSTAL_SIZE/2)
            rotate(angle)
        }
    pop()
}