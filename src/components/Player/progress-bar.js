import React from "react"
import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  margin: 30px 0;
  border: 1px solid #252525;
  height: 10px;
  width: 100%;
  border-radius: 60px;
    overflow: hidden;
`

const ProgressBar = styled.div`
  transition: .2s ease-out;
  background: #1DB954;
  height: 100%;
  width: ${props => `${props.width}%`};
      border-radius: 40px;
`

const ProgressBarPlayer = ({value}) => (
  <ProgressBarWrapper>
    <ProgressBar width={value} />
  </ProgressBarWrapper>
)

export default ProgressBarPlayer