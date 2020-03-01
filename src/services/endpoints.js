import apiSpotify from "./api";

export function fetchMePlayer() {
  return apiSpotify.get('/me/player')
}

export function fetchMeHistory() {
  return apiSpotify.get('/me/player/recently-played?limit=10')
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