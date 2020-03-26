import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Typography, Spin, notification, Table, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addToQueue } from '../actions/downloadQueue'
import queryString from 'query-string'
import AudioInfo from './AudioInfo'
import { queryCheck } from '../modules/search/queryCheck'
import { openExternal } from '../modules/electronConfig'

import { YoutubeTrack, SpotifyTrack, SpotifyPlaylist } from '../types'
import {
  LoadingOutlined,
  PlayCircleFilled,
  DownloadOutlined,
} from '@ant-design/icons'

interface Props extends RouteComponentProps<any> {
  //
}

const Query: React.FunctionComponent<Props> = ({ location }) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [spotifyResult, setSpotifyResult] = useState<
    SpotifyTrack | SpotifyPlaylist
  >()
  const [youtubeResult, setYoutubeResult] = useState<Array<YoutubeTrack>>()

  let dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    queryCheck(queryString.parse(location.search).query)
      .then(({ spotifyResult, youtubeResult }) => {
        setLoading(false)
        setSpotifyResult(spotifyResult)
        setYoutubeResult(youtubeResult)
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
      title: 'Title',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: String, record: any) => (
        <div className="video-actions">
          {/* <Button
            icon={<DownloadOutlined />}
            onClick={() =>
              dispatch(
                addToQueue({
                  youtubeMetadata: record,
                  spotifyMetadata: spotifyResult,
                })
              )
            }
            type="link"
          ></Button> */}
          <Button
            onClick={() => openExternal(record.link)}
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
        ) : spotifyResult || youtubeResult ? (
          <div className="container">
            {spotifyResult ? (
              <AudioInfo {...spotifyResult} url={spotifyResult.spotifyUrl} />
            ) : youtubeResult ? (
              <AudioInfo {...youtubeResult[0]} name={youtubeResult[0].title} />
            ) : null}
            <div className="results">
              <Typography.Text className="heading">
                Search Results
              </Typography.Text>
              <Table
                columns={colums}
                showHeader={false}
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
