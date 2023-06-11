export const track = (response: any) => {
  return {
    type: response.type,
    name: response.name,
    artist: {
      name: response.artists[0].name,
      spotifyId: response.artists[0].id,
      spotifyUrl: response.artists[0].external_urls.spotify,
    },
    album: {
      name: response.album.name,
      image: response.album.images[1].url,
      spotifyId: response.album.id,
      spotifyUrl: response.album.external_urls.spotify,
    },
    spotifyId: response.id,
    spotifyUrl: response.external_urls.spotify,
  }
}

export const playlist = (response: any) => {
  return {
    type: response.type,
    name: response.name,
    image: response.images[0].url,
    owner: {
      name: response.owner.display_name,
      spotifyUrl: response.owner.external_urls.spotify,
    },
    tracks: response.tracks.items.map(({ track }: { track: any }) =>
      track(track)
    ),
    followers: response.followers.count,
    spotifyId: response.id,
    spotifyUrl: response.external_urls.spotify,
  }
}
