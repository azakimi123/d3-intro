import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import './App.css';

import BarWrapper from './Components/ChartWrapper/BarWrapper';
import LineWrapper from './Components/ChartWrapper/LineWrapper';


class App extends Component {
  render() {
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Barchartly</Navbar.Brand>
      </Navbar>
      <Container>
        <BarWrapper />
        {/* <LineWrapper /> */}
      </Container>
      {/* <svg width='400' height='500'>
        <circle cx='150' cy='100' r='80' fill='#C97BFF'></circle>
        <circle cx='130' cy='100' r='60' fill='#FFB5F6'></circle>
        <circle cx='110' cy='100' r='40' fill='#8A465C'></circle>
        <rect x='50' y='250' width='200' height='100' fill='#12D79E'></rect>
      </svg> */}
    </div>
  );
  }
}

export default App;
