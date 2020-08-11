import * as youtube from './youtube/search'
import * as spotify from './spotify/search'
import { SpotifyTrack } from '../types/spotify'
import { Response } from '../types'
import { YTVideo } from '../types/youtube'

export default (query: string) => {
  return new Promise<Response>(async (resolve, reject) => {
    try {
      if (query.includes('youtube.com')) {
        // resolve(await youtube.searchById(query))
      } else if (query.includes('spotify.com')) {
        // resolve(await spotify.searchById(query))
      } else {
        let spotifyResponse: SpotifyTrack = await spotify.search(query)
        let youtubeResponse: Array<YTVideo> = await youtube.search(
          `${spotifyResponse.artist.name} ${spotifyResponse.name}`
        )
        resolve({
          info: spotifyResponse,
          tracks: [
            {
              metadata: spotifyResponse,
              videos: youtubeResponse,
            },
          ],
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
