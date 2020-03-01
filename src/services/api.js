import axios from 'axios'
import {getToken} from "./auth";

const token = getToken()

const apiSpotify = axios.create({
  baseURL: 'https://api.spotify.com/v1'
});

apiSpotify.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${token}`;
  return config
});

export default apiSpotify;