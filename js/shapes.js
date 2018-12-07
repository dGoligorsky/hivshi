// two separate things matter needs
// first thing: an engine - the computation and math behind thins
// second thing: a renderer - this draws the engine

// alias to make the code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
// deconstructing the aliases so, e.g. const Engine = Matter.Engine
const {Engine, Render, Bodies, World, MouseConstraint, Composites, Query} = Matter

Matter.use('matter-wrap')

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
        },
        // plugin: {
        //     wrap: {
        //         min: {x: 0, y: 0},
        //         max: {x: w, y: h}
        //     }
        // }
    })
}

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w/4, h/4), {
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
    initialShapes.bodies.push(shape)
    World.add(engine.world, shape)
})

// when we move our mouse, check matter for any collision
// does the mouse touch a body

// document.addEventListener("mousemove", function(event) {
//     const vector = { x: event.pageX, y: event.pageY }
//     const hoveredShapes = Query.point(initialShapes.bodies, vector)

//     hoveredShapes.forEach(shape => {
//         shape.render.sprite = null
//         shape.render.fillStyle = "red"
//     })

// })

// run both the engine and the renderer

Engine.run(engine)
Render.run(renderer)


// mess with gravity

let time = 0 

const changeGravity = function () {
    time = time + 0.02
    engine.world.gravity.x = Math.sin(time)
    engine.world.gravity.y = Math.cos(time)
    requestAnimationFrame(changeGravity)
}
changeGravity()


// // mess with gravity depending on mobile device orientation

// window.addEventListener("deviceorientation", function(event) {
//     engine.world.gravity.x = event.gamma / 30
//     engine.world.gravity.y = event.beta / 30
// })