// two separate things matter needs
// first thing: an engine - the computation and math behind thins
// second thing: a renderer - this draws the engine

// alias to make the code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
// deconstructing the aliases
const {Engine, Render} = Matter


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


// run both the engine and the renderer

Engine.run(engine)
Render.run(renderer)