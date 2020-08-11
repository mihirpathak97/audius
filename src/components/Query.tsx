import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Typography, Spin, notification, Table, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addToQueue } from '../actions/downloadQueue'
import queryString from 'query-string'
import AudioInfo from './AudioInfo'
import search from '../modules/search'
import { openExternal } from '../modules/electronConfig'

import { Track, Response } from '../types'
import {
  LoadingOutlined,
  PlayCircleFilled,
  DownloadOutlined,
} from '@ant-design/icons'
import { SpotifyTrack, SpotifyAlbum, SpotifyPlaylist } from '../types/spotify'
import { YTVideo } from '../types/youtube'

interface Props extends RouteComponentProps<any> {
  //
}

const Query: React.FunctionComponent<Props> = ({ location }) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [info, setInfo] = useState<
    SpotifyTrack | SpotifyAlbum | SpotifyPlaylist
  >()
  const [tracks, setTracks] = useState<Array<Track>>([])

  let dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    search(String(queryString.parse(location.search).query))
      .then((response: Response) => {
        setLoading(false)
        setInfo(response.info)
        setTracks(response.tracks)
        console.log(response.tracks)
      })
      .catch(error => {
        setLoading(false)
        if (typeof error.code !== 'string') {
          notification.error({
            message: 'Error!',
            description: error.message,
          })
        }
      })
  }, [location])

  const colums = [
    {
      dataIndex: ['metadata', 'name'],
      key: 'spotifyId',
      title: 'Title',
      width: '80%',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: String, record: Track) => (
        <div className="video-actions">
          <Button
            icon={<DownloadOutlined />}
            onClick={() =>
              dispatch(
                addToQueue({
                  video: record.video || record.videos[0],
                  metadata: record.metadata,
                })
              )
            }
            type="link"
          ></Button>
          <Button
            onClick={() => openExternal(record.metadata.spotifyUrl)}
            icon={<PlayCircleFilled />}
            type="link"
          ></Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="query">
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
        ) : tracks.length > 0 ? (
          <div className="container">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: '33%',
                maxWidth: '33%',
              }}
            >
              {info && <AudioInfo {...info} />}
              {tracks.length > 1 && (
                <Button
                  style={{
                    width: '160px',
                  }}
                  onClick={() => {
                    tracks.forEach(track => {
                      dispatch(
                        addToQueue({
                          video: track.video || track.videos[0],
                          metadata: track.metadata,
                        })
                      )
                    })
                  }}
                >
                  Download All
                </Button>
              )}
            </div>
            <div className="results">
              <Typography.Text className="heading">
                Search Results
              </Typography.Text>
              <Table
                columns={colums}
                showHeader={false}
                tableLayout="fixed"
                rowKey="id"
                pagination={false}
                dataSource={tracks}
              />
            </div>
          </div>
        ) : (
          <Typography.Text style={{ fontSize: '1.5rem' }}>
            Your search did not match any results
          </Typography.Text>
        )}
      </div>
    </div>
  )
}

export default withRouter(Query)
