import apiSpotify from "./api";
import {limitResult} from "./constants";

export function fetchMePlayer() {
  return apiSpotify.get('/me/player')
}

export function fetchMeHistory() {
  return apiSpotify.get(`/me/player/recently-played?limit=${limitResult.history}`)
}

export function fetchSearch(searchWord) {
  return apiSpotify.get(`search?q=${searchWord}&type=track`)
}

export function fetchMeMusicQueue(uri) {
  return apiSpotify.post('/me/player/add-to-queue?uri=' + uri)
}

export function fetchMeMusicPlay(data) {
  return apiSpotify.put('/me/player/play', {
    context_uri: data.uri,
    offset: {
      position: data.trackNumber - 1
    }
  })
}

export function fetchPauseMusic() {
  return apiSpotify.put('/me/player/pause')
}

export function fetchPlayMusic(data) {
  return apiSpotify.put('/me/player/play', {
    uris: [
      data.music.item.uri
    ],
    position_ms: data.music.progress_ms
  })
}

export function fetchBackwardMusic() {
  return apiSpotify.post('/me/player/previous')
}

export function fetchForwardMusic() {
  return apiSpotify.post('/me/player/next')
}