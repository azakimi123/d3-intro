import * as d3 from 'd3';


// const url = "https://udemy-react-d3.firebaseio.com/ages.json";

//data coming in from another source
// const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
// const url2 = "https://udemy-react-d3.firebaseio.com/tallest_women.json";

//Margin for the area we display our graph
const MARGIN = {'TOP': 10, 'BOTTOM': 50, 'LEFT': 70, 'RIGHT': 10};
const WIDTH = 800 -  MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Bar {
  // constructor function gets called once
  constructor(element) {
    const vis = this
    //creating our svg area
    vis.svg = d3.select(element)
      .append('svg')
        .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
        .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)



    //labels for our graph
    //x label
    vis.xLabel = vis.svg.append('text')
    .attr('x', WIDTH/2)
    .attr('y', HEIGHT + 50)
    .attr('text-anchor', 'middle')
    .text(`The World's Tallest Men`)

    //y label
    vis.svg.append('text')
    .attr('x', -HEIGHT/2)
    .attr('y', -50)
    .attr('text-anchor', 'middle')
    .text(`Height in cm`)
    .attr('transform', `rotate(-90)`)

    vis.xAxisGroup = vis.svg.append('g')
    .attr('transform', `translate(0, ${HEIGHT})`)

    vis.yAxisGroup = vis.svg.append('g')

    Promise.all([
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_men.json"),
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_women.json")
    ]).then((datasets) => {
      vis.menData = datasets[0]
      vis.womenData = datasets[1]
      vis.update('men')
    })

  }

  // update method is called multiple times
  update(gender) {
    const vis = this

    vis.data = (gender === 'men') ? vis.menData : vis.womenData;
    vis.xLabel.text(`The World's Tallest ${gender}`)
      //scale our y axis
      const y = d3.scaleLinear()
        .domain([
          d3.min(vis.data, d => d.height) * .95, 
          d3.max(vis.data, d => d.height)
        ])
        .range([HEIGHT, 0])

      // console.log(y(272))

      //scaling our x axis
      const x = d3.scaleBand()
        .domain(vis.data.map(d => d.name))
        .range([0, WIDTH])
        .padding(0.4)

      const xAxisCall = d3.axisBottom(x)
      vis.xAxisGroup.call(xAxisCall)

      const yAxisCall = d3.axisLeft(y)
      vis.yAxisGroup.transition().duration(500).call(yAxisCall)
      

    // DATA JOIN
    // create our svg shape
    const rects = vis.svg.selectAll("rect")
    .data(vis.data)

    // EXIT
    rects.exit()
      .transition().duration(500)
      .attr('height', 0)
      .attr('y', HEIGHT)
        .remove()


    // UPDATE
    rects
    // .attr('y', HEIGHT + MARGIN.BOTTOM + MARGIN.TOP)
    .transition().duration(500)
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.height))
        .attr('width', x.bandwidth)
        .attr('height', d => HEIGHT - y(d.height))
      
    // ENTER
    //create our svg shape
    rects.enter().append('rect')
      .attr('x', d => x(d.name))
      .attr('width', x.bandwidth)
      .attr('fill', '#00B192')
      .attr('y', HEIGHT)
      .transition().duration(500)
        .attr('y', d => y(d.height))
        .attr('height', d => HEIGHT - y(d.height))
      
      console.log(rects)
    
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