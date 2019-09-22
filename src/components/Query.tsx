import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Typography, Spin, Icon, notification, Table, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addToQueue } from '../actions/downloadQueue'
import queryString from 'query-string'
import AudioInfo from './AudioInfo'
import { queryCheck } from '../modules/queryCheck'
import { openExternal } from '../modules/electronConfig'

import { YTResult, SpotifyResult } from '../types'

const defaultArtwork = require('../assets/default-artwork.png')

interface Props extends RouteComponentProps<any> {
  //
}

const Query: React.FunctionComponent<Props> = ({ location }) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [spotifyResult, setSpotifyResult] = useState<SpotifyResult>()
  const [youtubeResult, setYoutubeResult] = useState<Array<YTResult>>()

  let dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    queryCheck(queryString.parse(location.search).query)
      .then(response => {
        setLoading(false)
        setSpotifyResult(response.spotifyResult)
        setYoutubeResult(response.youtubeResult)
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
      dataIndex: 'title',
      key: 'title',
      title: 'Video Title',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: String, record: any) => (
        <div className="video-actions">
          <Button
            icon="download"
            onClick={() =>
              dispatch(
                addToQueue({
                  youtubeMetadata: record,
                  spotifyMetadata: spotifyResult,
                })
              )
            }
            type="link"
          ></Button>
          <Button
            onClick={() => openExternal(record.link)}
            icon="play-circle"
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
          <Spin
            indicator={<Icon type="loading" style={{ fontSize: 64 }} spin />}
          />
        ) : spotifyResult || youtubeResult ? (
          <div className="container">
            {spotifyResult ? (
              <AudioInfo {...spotifyResult} />
            ) : (
              <AudioInfo
                name={youtubeResult ? youtubeResult[0].title : ''}
                artist={youtubeResult ? youtubeResult[0].channelTitle : ''}
                albumArt={defaultArtwork}
              />
            )}
            <div className="results">
              <Typography.Text className="heading">
                Search Results
              </Typography.Text>
              <Table
                columns={colums}
                rowKey="id"
                pagination={false}
                dataSource={youtubeResult}
              ></Table>
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
