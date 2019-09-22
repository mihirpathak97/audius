import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';

import { Typography, Spin, Icon, notification, Table, Button } from 'antd';

import QueueContext from '@/hooks/queue';

import queryString from 'query-string';
import AudioInfo from './AudioInfo';
import defaultArtwork from '@/assets/default-artwork.png';
import { queryCheck } from '../../modules/queryCheck';

const { openExternal } = require('@/modules/electronConfig');

const View = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [spotifyResult, setSpotifyResult] = useState('');
  const [youtubeResult, setYoutubeResult] = useState('');
  const [queue, dispatch] = useContext(QueueContext);

  useEffect(() => {
    setLoading(true);
    queryCheck(queryString.parse(location.search).query)
      .then(response => {
        setLoading(false);
        setSpotifyResult(response.spotifyResult);
        setYoutubeResult(response.youtubeResult);
      })
      .catch(error => {
        if (typeof error.code !== 'string') {
          setLoading(false);
          notification.error({
            message: 'Error!',
            description: error.message
          });
        }
      });
  }, [location]);

  const colums = [
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Video Title'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="video-actions">
          <Button
            icon="download"
            onClick={() => {
              dispatch({
                type: 'add',
                payload: {
                  youtubeMetadata: record,
                  spotifyMetadata: spotifyResult
                }
              });
            }}
            type="link"
          ></Button>
          <Button
            onClick={() => openExternal(record.link)}
            icon="play-circle"
            type="link"
          ></Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="query">
        {loading ? (
          <Spin
            indicator={<Icon type="loading" style={{ fontSize: 64 }} spin />}
          />
        ) : spotifyResult === '' ? (
          <Typography.Text style={{ fontSize: '1.5rem' }}>
            Your search did not match any results
          </Typography.Text>
        ) : (
          <div className="container">
            {spotifyResult === null ? (
              <AudioInfo
                name={youtubeResult[0].title}
                artist={youtubeResult[0].channelTitle}
                albumArt={defaultArtwork}
              />
            ) : (
              <AudioInfo {...spotifyResult} />
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
        )}
      </div>
    </div>
  );
};

export default withRouter(View);
