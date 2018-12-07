// two separate things matter needs
// first thing: an engine - the computation and math behind thins
// second thing: a renderer - this draws the engine

// alias to make the code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
// deconstructing the aliases so, e.g. const Engine = Matter.Engine
const {Engine, Render, Bodies, World, MouseConstraint, Composites} = Matter


// where is matter being deployed
const sectionTag = document.querySelector("section.shapes")

const w = window.innerWidth
const h = window.innerHeight

const engine = Engine.create()
const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        width: w,
        height: h,
        background: "#000000",
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
})

// have the ability to create a shape on the page
const createShape = function(x,y) {
    return Bodies.rectangle(x, y, 38, 50, {
        // frictionAir: 0.1,
        render: {
            // fillStyle: "red", 
            sprite: {
                texture: "assets/outline-2x.png",
                xScale: 0.5,
                yScale: 0.5
            }
        }
    })
}

const bigBall = Bodies.circle(w / 2, h / 2, 250, {
        isStatic: true,
        render: {
            fillStyle: "#ffffff"
        }
})

const wallOptions = {
    isStatic: true,
    render: {
        fillStyle: "#0033cc",
        visible: true
    }
}

const ground = Bodies.rectangle(w /2, h + 50, w + 100, 100, wallOptions)
const ceiling = Bodies.rectangle(w /2, -50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)

// make the mouse interact with stuff
const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
})

const initialShapes = Composites.stack(50, 50, 20, 15, 40, 40, function(x, y) {
    return createShape(x, y)
})

// add things to the world in an array
World.add(engine.world, [
    bigBall, 
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl, 
    initialShapes
])

// when we click, add a new shape
document.addEventListener("click", function(event) {
    const shape = createShape(event.pageX, event.pageY)
    World.add(engine.world, shape)
})

// run both the engine and the renderer

Engine.run(engine)
Render.run(renderer)