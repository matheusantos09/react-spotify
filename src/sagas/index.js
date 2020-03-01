import {all, call, put, takeLatest} from 'redux-saga/effects'
import {Creators as CreatorsPlayer, Types as TypesPlayer} from "../store/ducks/player"
import {Creators as CreatorsHistory, Types as TypesHistory} from "../store/ducks/history"
import {Creators as CreatorsSearch, Types as TypesSearch} from "../store/ducks/search"
import {fetchMeHistory, fetchMeMusicPlay, fetchMeMusicQueue, fetchMePlayer, fetchSearch} from "../services/endpoints"

import {toast} from "react-toastify";

const toastConfigDefault = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

function* sagaFetchPlayer() {
  const response = yield call(fetchMePlayer)

  if (response.status < 300) {
    yield put(CreatorsPlayer.fetchMusicSuccess(response.data))
  } else {
    yield put(CreatorsPlayer.fetchMusicError())
  }
}

function* sagaFetchHistory() {
  const response = yield call(fetchMeHistory)

  if (response.status < 300) {
    yield put(CreatorsHistory.fetchHistorySuccess(response.data))
  } else {
    yield put(CreatorsHistory.fetchHistoryError())
  }
}

function* sagaFetchSearch(action) {
  const response = yield call(fetchSearch, action.search)

  if (response.status < 300) {
    yield put(CreatorsSearch.showResult(true))
    yield put(CreatorsSearch.fetchSearchSuccess(response.data.tracks.items))
  } else {
    yield put(CreatorsSearch.fetchSearchError())
  }
}

function* sagaFetchMeMusicQueue(action) {
  const response = yield call(fetchMeMusicQueue, action.uri)

  if (response.status < 300) {
    yield toast.success('Música adicionada a sua fila de reprodução', toastConfigDefault)
  } else {
    yield toast.error('Não foi possível adicionar a música', toastConfigDefault)
  }

}

function* sagaFetchMeMusicPlay(action) {

  const response = yield call(fetchMeMusicPlay, action)

  if (response.status < 300) {
    yield  toast.success('Reproduzindo a música', toastConfigDefault)
  } else {
    yield toast.error('Não foi possível reproduzir a música', toastConfigDefault)
  }

}

export default function* rootSaga() {
  return yield all([
    yield takeLatest(TypesPlayer.FETCH_MUSIC_SAGA, sagaFetchPlayer),
    yield takeLatest(TypesHistory.FETCH_HISTORY_SAGA, sagaFetchHistory),
    yield takeLatest(TypesSearch.FETCH_SEARCH_SAGA, sagaFetchSearch),
    yield takeLatest(TypesSearch.ADD_MUSIC_QUEUE, sagaFetchMeMusicQueue),
    yield takeLatest(TypesSearch.PLAY_MUSIC, sagaFetchMeMusicPlay),
  ])
}