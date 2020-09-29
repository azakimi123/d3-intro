import React, { useEffect, useState, useRef } from 'react';
import D3Line from '../D3Chart/D3Line';


function LineWrapper(props) {

  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if(!chart) {
      setChart(new D3Line(chartArea.current))
    }
  }, [chart])

  return(
    <div className='chart-area' ref={chartArea}></div>
  )
}

export default LineWrapper;
