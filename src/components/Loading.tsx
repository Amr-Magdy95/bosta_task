import React from 'react'
import styled from 'styled-components'

function Loading() {
  return (
    <Wrapper></Wrapper>
  )
}

const Wrapper = styled.div`
  width: 6rem;
  margin: 2rem auto;
  height: 6rem;
  transition: .5s;
  border-radius: 50%;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export default Loading