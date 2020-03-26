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
  youtubeMetadata: YoutubeTrack
  spotifyMetadata?: SpotifyTrack
  progress?: StreamProgress
}

export interface ReduxAction {
  type: string
  queuePayload: QueueItem
  progressPayload: StreamProgress
  index: number
}

export interface YoutubeTrack {
  id: string
  link: string
  kind: string
  publishedAt: string
  channelId: string
  channelTitle: string
  title: string
  description: string
  duration: number
}

export interface SpotifyTrack {
  type: string
  name: string
  artist: SpotifyArtist
  album: SpotifyAlbum
  spotifyId: string
  spotifyUrl: string
}

export interface SpotifyAlbum {
  name: string
  image: string
  spotifyId: string
  spotifyUrl: string
}

export interface SpotifyArtist {
  name: string
  spotifyId: string
  spotifyUrl: string
}
