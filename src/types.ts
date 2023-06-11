import { SpotifyTrack, SpotifyPlaylist, SpotifyAlbum } from './types/spotify'
import { YTVideo } from './types/youtube'

export interface StreamProgress {
  percentage: number
  transferred: number
  length: number
  remaining: number
  eta: number
  runtime: number
  delta: number
  speed: number
}

export interface Store {
  downloadQueue: Array<QueueItem>
}

export interface QueueItem {
  video: YTVideo
  metadata?: SpotifyTrack
  progress?: StreamProgress
}

export interface ReduxAction {
  type: string
  queuePayload: QueueItem
  progressPayload: StreamProgress
  index: number
}

export interface Track {
  metadata: SpotifyTrack
  videos: Array<YTVideo>
  video?: YTVideo
}

export interface Response {
  info: SpotifyTrack | SpotifyAlbum | SpotifyPlaylist
  tracks: Array<Track>
}
