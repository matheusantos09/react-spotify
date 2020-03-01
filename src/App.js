import React from 'react';
import {Provider} from 'react-redux'
import store from './store'

import ContainerDefault from "./components/ContainerDefault";

const App = () => {
  return (
    <Provider store={store}>
      <ContainerDefault />
    </Provider>
  );
}

export default App;
