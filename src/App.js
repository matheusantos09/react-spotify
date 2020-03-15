import React from 'react';
import {Provider} from 'react-redux'
import store from './store'

import ContainerDefault from "./components/ContainerDefault";

store.subscribe(() => console.log(store.getState()))

//@TODO APLICAR O SUSPENSE PARA O LAZYLOAD

const App = () => {
  return (
    <Provider store={store}>
      <ContainerDefault />
    </Provider>
  );
}

export default App;
