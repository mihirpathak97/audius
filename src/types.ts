export interface StreamProgress {
  percentage: number;
  transferred: number;
  length: number;
  remaining: number;
  eta: number;
  runtime: number;
  delta: number;
  speed: number;
}

export interface Store {
  downloadQueue: Array<QueueItem>;
}

export interface QueueItem {
  youtubeMetadata: YTResult;
  spotifyMetadata?: SpotifyResult;
  progress?: StreamProgress;
}

export interface ReduxAction {
  type: string;
  queuePayload: QueueItem;
  progressPayload: StreamProgress;
  index: number;
}

export interface YTResult {
  id: string;
  link: string;
  kind: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
  duration: number;
}

export interface SpotifyResult {
  type: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyTrackId: string;
  spotifyTrackUrl: string;
  spotifyAlbumId: string;
  spotifyAlbumUrl: string;
}
