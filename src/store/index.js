import reducers from './reducers'
import {applyMiddleware, compose, createStore} from "redux";
import createSaga from 'redux-saga'
import sagas from '../sagas'

const sagaMiddleware = createSaga();

const dev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    dev
  )
)

sagaMiddleware.run(sagas)