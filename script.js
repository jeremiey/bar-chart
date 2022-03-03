let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
let req = new XMLHttpRequest()

let data
let dataset

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

  heightScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (item) => {
                    return item[1]
                  })])
                  .range([0, height - (2 * padding)])

  xScale = d3.scaleLinear()
             .domain([0, dataset.length - 1])
             .range([padding, width - padding])

  let datesArray = dataset.map((item) => {
    return new Date(item[0])
  })
  // console.log(datesArray)

  xAxisScale = d3.scaleTime()
                 .domain([d3.min(datesArray), d3.max(datesArray)])
                 .range([padding, width - padding])

  yAxisScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset, (item) => item[1])])
                 .range([height - padding, padding])
}

let drawBars = () => {
  svg.selectAll('rect')
     .data(dataset)
     .enter()
     .append('rect')
     .attr('class', 'bar')
     .attr('width', (width = (2 * padding)) / dataset.length)
     .attr('data-date', (item) => {
       return item[0]
     })
     .attr('data-gdp', (item) => {
       return item[1]
     })
}

let generateAxes = () => {
  
  let xAxis = d3.axisBottom(xAxisScale)
  let yAxis = d3.axisLeft(yAxisScale)

  svg.append('g')
     .call(xAxis)
     .attr('id', 'x-axis')
     .attr('transform', `translate(0, ${height - padding})`)

  svg.append('g')
     .call(yAxis)
     .attr('id', 'y-axis')
     .attr('transform', `translate(${padding}, 0)`)

}

fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    dataset = data.data
    console.log(dataset)
    drawCanvas()
    generateScales()
    drawBars()
    generateAxes()
  })
