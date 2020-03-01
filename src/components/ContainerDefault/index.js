import React from 'react';
import {useSelector} from 'react-redux'
import styled from "styled-components";
import 'normalize.css'

import Routes from "../../Routes";
import {ToastContainer} from "react-toastify";

const AppBody = styled.div`
   background-color: #000; 
   min-height: 100vh;
   height: 100%;
   font-family: 'Source Sans Pro', sans-serif;
   color: #FFF;
   box-sizing: border-box;
   margin: 0;
`;

const ContainerDefault = () => {
  const showResultSearch = useSelector(state => state.search.showResult)

  document.getElementsByTagName('body')[0].setAttribute('style', '')

  if (showResultSearch) {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:hidden')
  }

  return (
    <AppBody>
      <Routes />

      <ToastContainer />
    </AppBody>
  );
}

export default ContainerDefault;
