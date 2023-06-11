import queryString from 'query-string'
import { call } from './api'
import { track, playlist } from './parser'
import { SpotifyTrack } from '../../types/spotify'

export const searchById = (uri: string) => {
  return new Promise(async (resolve, reject) => {
    const type = uri.split('/')[0]
    try {
      let response = await call(uri)
      switch (type) {
        case 'track':
          resolve(track(response))
          break
        case 'playlist':
          resolve(playlist(response))
          break
        default:
          throw new Error('Unable to handle response')
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const search = (query: string) => {
  return new Promise<SpotifyTrack>(async (resolve, reject) => {
    try {
      const response: any = await call(
        'search?' +
          queryString.stringify({
            q: query,
            type: 'track',
          })
      )
      if (response.tracks.items.length === 0) {
        throw new Error('Track not found')
      }
      resolve(track(response.tracks.items[0]))
    } catch (error) {
      reject(error)
    }
  })
}
