import {all, call, put, takeLatest} from "redux-saga/effects";
import {
  fetchBackwardMusic,
  fetchForwardMusic,
  fetchMeHistory,
  fetchMeMusicPlay,
  fetchMeMusicQueue,
  fetchMePlayer,
  fetchPauseMusic,
  fetchPlayMusic,
  fetchSearch
} from "../../../services/endpoints";
import {Creators as CreatorsPlayer, Types as TypesPlayer} from "./player";
import {Creators as CreatorsHistory, Types as TypesHistory} from "./history";
import {Creators as CreatorsSearch, Types as TypesSearch} from "./search";
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

function* sagaFetchPlayPauseMusic(action) {
  const endPoint = !action.play_pause ? fetchPlayMusic : fetchPauseMusic
  const response = yield call(endPoint, action)

  if (response.status > 300) {
    yield toast.error('Não foi possível reproduzir ou pausar a música', toastConfigDefault)
  }

}

function* sagaFetchBackwardMusic(action) {
  const response = yield call(fetchBackwardMusic, action)

  if (response.status > 300) {
    yield toast.error('Não foi possível processar sua requisição', toastConfigDefault)
  }

}

function* sagaFetchForwardMusic(action) {
  try {
    const response = yield call(fetchForwardMusic, action)

    if (response.status > 300) {
      yield toast.error('Não foi possível processar sua requisição', toastConfigDefault)
    }
  } catch (e) {
    yield toast.error('Não foi possível processar sua requisição', toastConfigDefault)
  }
}

export default function* rootSaga() {
  return yield all([
    yield takeLatest(TypesPlayer.FETCH_MUSIC_SAGA, sagaFetchPlayer),
    yield takeLatest(TypesPlayer.FETCH_PLAY_PAUSE_MUSIC_SAGA, sagaFetchPlayPauseMusic),
    yield takeLatest(TypesPlayer.FETCH_STEP_BACKWARD_SAGA, sagaFetchBackwardMusic),
    yield takeLatest(TypesPlayer.FETCH_STEP_FORWARD_SAGA, sagaFetchForwardMusic),

    yield takeLatest(TypesHistory.FETCH_HISTORY_SAGA, sagaFetchHistory),

    yield takeLatest(TypesSearch.FETCH_SEARCH_SAGA, sagaFetchSearch),
    yield takeLatest(TypesSearch.ADD_MUSIC_QUEUE, sagaFetchMeMusicQueue),
    yield takeLatest(TypesSearch.PLAY_MUSIC, sagaFetchMeMusicPlay),
  ])
}