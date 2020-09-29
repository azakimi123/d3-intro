import * as d3 from 'd3';


// const url = "https://udemy-react-d3.firebaseio.com/ages.json";

//data coming in from another source
const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

//Margin for the area we display our graph
const MARGIN = {'TOP': 10, 'BOTTOM': 50, 'LEFT': 70, 'RIGHT': 10};
const WIDTH = 800 -  MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Bar {
  constructor(element) {
    //creating our svg area
    const svg = d3.select(element)
      .append('svg')
        .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
        .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    //bringing in our data to use
    d3.json(url).then(data => {
      // console.log(data)

      //max being responsive
      // const max = d3.max(data, d => {
      //   return d.height
      // })

      //scale our y axis
      const y = d3.scaleLinear()
        .domain([
          d3.min(data, d => d.height) * .95, 
          d3.max(data, d => d.height)
        ])
        .range([HEIGHT, 0])

      // console.log(y(272))

      //scaling our x axis
      const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, WIDTH])
        .padding(0.4)

      const xAxisCall = d3.axisBottom(x)
      svg.append('g')
        .attr('transform', `translate(0, ${HEIGHT})`)
        .call(xAxisCall)

      const yAxisCall = d3.axisLeft(y)
      svg.append('g').call(yAxisCall)

      //labels for our graph

      //x label
      svg.append('text')
        .attr('x', WIDTH/2)
        .attr('y', HEIGHT + 50)
        .attr('text-anchor', 'middle')
        .text(`The World's Tallest Men`)

      //y label
      svg.append('text')
      .attr('x', -HEIGHT/2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text(`Height in cm`)
      .attr('transform', `rotate(-90)`)
      
      //create our svg shape
      const rects = svg.selectAll("rect")
        .data(data)

      //create our svg shape
      rects.enter().append('rect')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.height))
        .attr('width', x.bandwidth)
        .attr('height', d => HEIGHT - y(d.height))
        .attr('fill', '#00B192')

    })

  }
}


// const svg = d3.select(element)
// .append('svg')
//   .attr('width' , 500)
//   .attr('height' , 500)

// d3.json(url).then(agesData => {
// console.log(agesData)
// const rects = svg.selectAll('rect')
// .data(agesData)

// rects.enter()
// .append('rect')
//   .attr('x', (d, i) => i * 100)
//   .attr('y', 50)
//   .attr('width', 50)
//   .attr('height', d => d.age * 10) 
//   .attr('fill', d => {
//     if (d.age > 10) {
//       return "red"
//     } 
//       return 'green'
//   })
// })