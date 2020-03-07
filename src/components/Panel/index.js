import React from "react";
import styled from "styled-components";

import Dashboard from "../Dashboard";
import PlayerFloat from "../PlayerFloat";

const Container = styled.div`
   max-width: 1140px;
   padding: 0 15px;
   margin: 0 auto;
`

const Panel = () => {

  return (
    <Container>
      <Dashboard />
      <PlayerFloat/>
    </Container>
  )
}

export default Panel