/*
  SpotifyWebApi.js: JS wrapper for the Spotify Web API providing basic functionalities for searching
*/

import { AxiosResponse, AxiosError } from 'axios'

import axios from 'axios'
import storage from '../store'

const { ipcRenderer } = window.require('electron')

// Spotify API endpoint URL
const endpointURL = 'https://api.spotify.com/v1/'
const commonConfig = {
  headers: {
    Authorization: 'Bearer ' + storage.get('spotifyAccessToken'),
  },
}

var tries = 5
const refreshSpotifyToken = () => {
  return new Promise((resolve, reject) => {
    console.log(tries)
    if (tries > 0) {
      tries--
      let token = ipcRenderer.sendSync('refresh-spotify-token')
      if (token) {
        storage.set('spotifyAccessToken', token)
        resolve(true)
        tries = 0
      } else {
        reject(false)
      }
    }
  })
}

export const call = (uri: string, config?: object) => {
  tries = 5
  return new Promise((resolve, reject) => {
    function run() {
      axios
        .get(endpointURL + uri, {
          ...commonConfig,
          ...config,
        })
        .then((response: AxiosResponse) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          // Refresh token
          if (error.message.includes('401')) {
            refreshSpotifyToken()
              .then(run)
              .catch(() => reject(error))
          } else {
            reject(error)
          }
        })
    }
    run()
  })
}
