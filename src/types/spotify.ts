export interface SpotifyUser {
  name: string
  spotifyUrl: string
}

export interface SpotifyPlaylist {
  type: string
  name: string
  image: string
  owner: SpotifyUser
  tracks: Array<SpotifyTrack>
  followers: number
  spotifyId: string
  spotifyUrl: string
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
