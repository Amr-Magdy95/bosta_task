import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Tracking from './components/Tracking';


function App() {
  return (
    <Wrapper >
      <Navbar />
      <Tracking />
    </Wrapper>)

}

const Wrapper = styled.main`
`

export default App;
