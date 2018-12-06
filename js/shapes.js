// two separate things matter needs
// first thing: an engine - the computation and math behind thins
// second thing: a renderer - this draws the engine

// alias to make the code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
// deconstructing the aliases
const {Engine, Render, Bodies, World} = Matter


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
    return Bodies.circle(x, y, 20 + 20 * Math.random(), {
        render: {
            fillStyle: "red"
        }
    })
}

const bigBall = Bodies.circle(w / 2, h / 2, 250, {
        isStatic: true,
        render: {
            fillStyle: "#ffffff"
        }
})
World.add(engine.world, bigBall)

// when we click, add a new shape
document.addEventListener("click", function(event) {
    const shape = createShape(event.pageX, event.pageY)
    World.add(engine.world, shape)
})

// run both the engine and the renderer

Engine.run(engine)
Render.run(renderer)