import {all, call, delay, put, race, takeLatest} from "redux-saga/effects";
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

const TIMEOUT = 20000;

function* sagaFetchPlayer() {
  try {
    const {response, timeout} = yield race({
      response: call(fetchMePlayer),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status < 300) {
      yield put(CreatorsPlayer.fetchMusicSuccess(response.data))
    } else {
      yield put(CreatorsPlayer.fetchMusicError())
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
    window.location.href = '/painel'
    return true;
  }
}

function* sagaFetchHistory() {
  try {
    const {response, timeout} = yield race({
      response: call(fetchMeHistory),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status < 300) {
      yield put(CreatorsHistory.fetchHistorySuccess(response.data))
    } else {
      yield put(CreatorsHistory.fetchHistoryError())
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

function* sagaFetchSearch(action) {
  try {
    const {response, timeout} = yield race({
      response: call(fetchSearch, action.search),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status < 300) {
      yield put(CreatorsSearch.showResult(true));
      yield put(CreatorsSearch.fetchSearchSuccess(response.data.tracks.items))
    } else {
      yield put(CreatorsSearch.fetchSearchError())
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

function* sagaFetchMeMusicQueue(action) {
  try {
    const {response, timeout} = yield race({
      response: call(fetchMeMusicQueue, action.uri),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status < 300) {
      yield toast.success('Música adicionada a sua fila de reprodução', toastConfigDefault)
    } else {
      yield toast.error('Não foi possível adicionar a música', toastConfigDefault)
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

function* sagaFetchMeMusicPlay(action) {
  try {
    const {response, timeout} = yield race({
      response: call(fetchMeMusicPlay, action),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status < 300) {
      yield  toast.success('Reproduzindo a música', toastConfigDefault)
    } else {
      yield toast.error('Não foi possível reproduzir a música', toastConfigDefault)
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

function* sagaFetchPlayPauseMusic(action) {
  try {
    const endPoint = !action.play_pause ? fetchPlayMusic : fetchPauseMusic;
    const {response, timeout} = yield race({
      response: call(endPoint, action),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status > 300) {
      yield toast.error('Não foi possível reproduzir ou pausar a música', toastConfigDefault)
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

function* sagaFetchBackwardMusic(action) {
  try {
    const {response, timeout} = yield race({
      response: call(fetchBackwardMusic, action),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status > 300) {
      yield toast.error('Não foi possível processar sua requisição', toastConfigDefault)
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

function* sagaFetchForwardMusic(action) {
  try {

    const {response, timeout} = yield race({
      response: call(fetchForwardMusic, action),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status > 300) {
      yield toast.error('Não foi possível processar sua requisição', toastConfigDefault)
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

function* sagaSearchHistory(action) {
  yield put(CreatorsHistory.historySearch(action.search))
}

export default function* rootSaga() {
  return yield all([
    yield takeLatest(TypesPlayer.FETCH_MUSIC_SAGA, sagaFetchPlayer),
    yield takeLatest(TypesPlayer.FETCH_PLAY_PAUSE_MUSIC_SAGA, sagaFetchPlayPauseMusic),
    yield takeLatest(TypesPlayer.FETCH_STEP_BACKWARD_SAGA, sagaFetchBackwardMusic),
    yield takeLatest(TypesPlayer.FETCH_STEP_FORWARD_SAGA, sagaFetchForwardMusic),

    yield takeLatest(TypesHistory.FETCH_HISTORY_SAGA, sagaFetchHistory),
    yield takeLatest(TypesHistory.HISTORY_SEARCH_SAGA, sagaSearchHistory),

    yield takeLatest(TypesSearch.FETCH_SEARCH_SAGA, sagaFetchSearch),
    yield takeLatest(TypesSearch.ADD_MUSIC_QUEUE, sagaFetchMeMusicQueue),
    yield takeLatest(TypesSearch.PLAY_MUSIC, sagaFetchMeMusicPlay),
  ])
}