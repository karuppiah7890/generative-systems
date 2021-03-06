class Layer {
    constructor() {
        this.sides = SIDES
        this.numberOfShapes = this.sides
        this.angle = 360 / this.numberOfShapes
        this.layerColor = getRandomFromPallete()
        this.thinStroke = 1
        this.thickStroke = 3
        this.stepsOut = 8
        this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut
    }
}

class Circles extends Layer {
    constructor() {
        super()
        this.shapeSize = (CRYSTAL_SIZE / 2) * 0.93
        this.position = (CRYSTAL_SIZE / 2) - (this.shapeSize / 2)
    }

    render() {
        noFill()
        stroke(this.layerColor)
        strokeWeight(1)
        push()
        // translate(width/2, height/2)
        for(let i=0; i<this.numberOfShapes; i++) {
            ellipse(this.position, 0, this.shapeSize, this.shapeSize)
            rotate(this.angle)
        }
        pop()
    }
}

class SimpleLines extends Layer {
    constructor() {
        super()
        this.numberOfSteps = randomSelectTwo()? this.stepsOut : int(this.stepsOut*1.25)
        this.step = (CRYSTAL_SIZE / 2) / this.numberOfSteps
        this.start = floor(random(0, this.numberOfSteps))
        this.stop = floor(random(this.start + 1, this.numberOfSteps + 1))    
        this.weight = randomSelectTwo()? this.thinStroke : this.thickStroke
        this.numberOfShapes = randomSelectTwo()? this.sides : this.sides*2
        this.angle = 360 / this.numberOfShapes
    }

    render() {
        noFill()
        stroke(this.layerColor)
        strokeWeight(this.weight)
        push()
        // translate(width/2, height/2)
        for(let i=0; i<this.numberOfShapes; i++) {
            line(this.start * this.step, 0, this.stop * this.step, 0)
            rotate(this.angle)
        }
        pop()
    }
}

class OutlineShape extends Layer {
    constructor() {
        super()
        this.weight = randomSelectTwo()? this.thinStroke : this.thickStroke
        this.hexagonTrue = randomSelectTwo()   
    }

    render() {
        stroke(this.layerColor)
        strokeWeight(this.weight)
        push()
        // translate(width/2, height/2)
        if(this.hexagonTrue) {
            hexagon(0, 0, CRYSTAL_SIZE / 2)
        } else {
            ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
        }
        pop()
    }
}

class DottedLines extends Layer {
    constructor() {
        super()
        this.numberOfShapes = randomSelectTwo()? this.sides : this.sides*2
        this.angle = 360 / this.numberOfShapes
        this.shapeSize = 3
        this.centerOffset = this.singleStep
    }

    render() {
        fill(this.layerColor)
        noStroke()
        push()
        // translate(width/2, height/2)
        for(let i = 0; i < this.numberOfShapes; i++) {
            for(let x = this.centerOffset; x < CRYSTAL_SIZE/2; x += this.singleStep) {
                rect(x, 0, this.shapeSize, this.shapeSize)        
            }
            rotate(this.angle)
        }
        pop()
    }
}

class CenteredShape extends Layer {
    constructor() {
        super()
        this.randomShape = random(1)
        this.shapeSize = floor(random(this.stepsOut / 2, this.stepsOut - 2)) * this.singleStep
    }

    render() {
        fill(this.layerColor)
        noStroke()
        push()
        // translate(width/2, height/2)
        if(this.randomShape < 0.2) {
            rect(0, 0, this.shapeSize*2, this.shapeSize*2)
        } else if(this.randomShape >= 0.2 && this.randomShape < 0.6) {
            ellipse(0, 0, this.shapeSize, this.shapeSize)
        } else {
            rotate(this.angle / 2)
            hexagon(0, 0, this.shapeSize)
        }
        pop()
    }
}

class RingOfShapes extends Layer {
    constructor() {
        super()
        this.step = floor(random(1, this.stepsOut))
        this.center = this.step * this.singleStep
        this.randomShape = random(1)
        this.fillColor = randomSelectTwo()? this.layerColor : color(0, 1)
        this.weight = randomSelectTwo()? this.thinStroke : this.thickStroke
        this.direction = randomSelectTwo()

        if(this.step < this.stepsOut/2) {
            this.radius = floor(random(1, this.step)) * this.singleStep
        } else if( this.step > this.stepsOut/2) {
            this.radius = floor(random(1, this.stepsOut - this.step)) * this.singleStep
        } else {
            this.radius = floor(random(1, this.stepsOut/2 + 1)) * this.singleStep            
        }
    }

    render() {
        fill(this.fillColor)
        stroke(this.layerColor)
        strokeWeight(this.weight)
        push()
        // translate(width/2, height/2)
        for(let i = 0; i < this.numberOfShapes; i++) {
            if(this.randomShape < 0.33) {
                ellipse(0, this.center, this.radius, this.radius)
            } else if(this.randomShape >= 0.33 && this.randomShape < 0.66) {
                rect(0, this.center, this.radius, this.radius)
            } else {
                myTriangle(this.center, 0, this.radius, this.direction)
            }
            rotate(this.angle)
        }
        pop()
    }
}

class SteppedHexagons extends Layer {
    constructor() {
        super()
        this.centerOffset = ( CRYSTAL_SIZE / 2 ) * 0.15
        this.numberOfSteps = randomSelectTwo()? this.stepsOut : int(this.stepsOut*1.25)
        this.singleStep = ( (CRYSTAL_SIZE / 2) - this.centerOffset ) / this.numberOfSteps
        this.weight = randomSelectTwo()? this.thinStroke : this.thickStroke        
    }

    render() {
        noFill()
        stroke(this.layerColor)
        strokeWeight(this.weight)
        push()
        // translate(width/2, height/2)
        rotate(this.angle / 2)
        for(let i = 1; i < this.numberOfSteps; i++) {
            hexagon(0, 0, this.centerOffset + (i * this.singleStep))
        }
        pop()
    }
}

const layerContructors = [
    {
        name: "Circles",
        init: () => new Circles(),
        weight: 0.3
    },
    {
        name: "Simple Lines",
        init: () => new SimpleLines(),
        weight: 0.3
    },
    {
        name: "Outline Shape",
        init: () => new OutlineShape(),
        weight: 0.3
    },
    {
        name: "Dotted Lines",
        init: () => new DottedLines(),
        weight: 0.3
    },
    {
        name: "Centered Shape",
        init: () => new CenteredShape(),
        weight: 0.3
    },
    {
        name: "Ring of Shapes",
        init: () => new RingOfShapes(),
        weight: 0.3
    },
    {
        name: "Stepped Hexagons",
        init: () => new SteppedHexagons(),
        weight: 0.3
    }
]