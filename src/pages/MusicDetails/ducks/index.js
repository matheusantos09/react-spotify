import {all, call, delay, put, race, takeLatest} from "redux-saga/effects";
import {fetchMusicById} from "../../../services/endpoints";
import {Creators as CreatorsMusic, Types as TypesMusic} from "./music";
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

function* sagaFetchMusic(action) {
  const id = action.id.split(':track:')[1]

  try {
    const {response, timeout} = yield race({
      response: call(fetchMusicById, id),
      timeout: delay(TIMEOUT)
    });

    if (timeout) {
      yield toast.error('Não foi possível carregar as informações do Spotify', toastConfigDefault);
      return;
    }

    if (response.status < 300) {
      yield put(CreatorsMusic.fetchMusicSuccess(response.data))
    } else {
      yield put(CreatorsMusic.fetchMusicError())
    }

  } catch (e) {
    yield toast.error('Ocorreu um erro ao carregar os dados do Spotify', toastConfigDefault);
    yield console.log(e)
  }
}

export default function* rootSaga() {
  return yield all([
    yield takeLatest(TypesMusic.FETCH_MUSIC_BY_ID_SAGA, sagaFetchMusic),
  ])
}