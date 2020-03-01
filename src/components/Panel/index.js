import React from "react";
import styled from "styled-components";
import store from "../../store";

import Dashboard from "../Dashboard";

const Container = styled.div`
   max-width: 1140px;
   padding: 0 15px;
   margin: 0 auto;
`

// store.subscribe(() => console.log(store.getState()))

const Panel = () => {

  return (
    <Container>
      <Dashboard />
    </Container>
  );
}

export default Panel