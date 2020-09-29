import React, { useEffect, useState, useRef } from 'react';
import D3Bar from '../D3Chart/D3Bar';


function BarWrapper(props) {

  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if(!chart) {
      setChart(new D3Bar(chartArea.current))
    }
  }, [chart])

  return(
    <div className='chart-area' ref={chartArea}></div>
  )
}

export default BarWrapper;


// class ChartWrapper extends Component {

//   componentDidMount(){
//     new D3Chart(this.refs.chart)
//   }

//   render() {
//     return <div ref='chart'></div>
//   }
// }