export const authEndPoint = 'https://accounts.spotify.com/authorize'

export const clientId = 'ce9edf3ea96f473da926ba1526a2c78b'
export const redirectUri = 'http://localhost:3000/redirect'
export const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
]

export const scopesParametersUri = scopes.join(
  "%20"
)

export const SPEED_REQUEST_MUSIC = 500