class Crystal {
    constructor(posX, posY) {
        this.x = posX
        this.y = posY
        this.layers = []

        layerContructors.forEach((layerContructor) => {
            let picker = random(1)
            if(picker > layerContructor.weight)
            this.layers.push(layerContructor.init())
        })
    }

    render() {
        push()
        translate(this.x, this.y)
        this.layers.forEach((layer) => {
            layer.render()
        })
        pop()
    }
}