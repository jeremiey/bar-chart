let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
let req = new XMLHttpRequest()

let data
let values

let heightScale
let xScale
let xAxisScale
let yScale
let yAxisScale

let width = 800
let height = 600
let padding = 40

let svg = d3.select('svg')

let drawCanvas = () => {
  svg.attr("width", width)
     .attr("height", height)
}

let generateScales = () => {

}

let drawBars = () => {

}

let generateAxes = () => {

}

fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    values = data.data
    // console.log(values)
    drawCanvas()
    generateScales()
    drawBars()
    generateAxes()
  })
