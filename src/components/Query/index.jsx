import React, { Component } from 'react';
import { withRouter } from 'react-router';

import {
  Typography,
  Spin,
  Icon,
  message,
  Table,
  Button
} from 'antd';

import { connect } from 'react-redux';
import { addToQueue } from '../../actions/downloadQueue';

import queryString from 'query-string';
import AudioInfo from './AudioInfo';
import defaultArtwork from '@/assets/default-artwork.png';
import { queryCheck } from '../../modules/queryCheck';

const {
  openExternal
} = require('@/modules/electronConfig');

class View extends Component {

  state = {
    spotifyResult: '',
    youtubeResult: '',
    loading: false
  }

  componentDidMount() {
    message.config({
      top: 50
    })
    this.setState({
      loading: true
    })
    queryCheck(queryString.parse(this.props.location.search).query).then(response => {
      this.setState({
        spotifyResult: response.spotifyResult,
        youtubeResult: response.youtubeResult,
        loading: false
      });
    }).catch(error => {
      if (typeof(error.code) !== 'string') {
        this.setState({
          loading: false
        })
        message.error(error.message, 5)
      }
    });
  }

  componentWillUnmount() {
    message.destroy()
  }

  render() {

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
            <Button icon="download" onClick={() => {this.props.addToQueue({
              youtubeMetadata: record,
              spotifyMetadata: this.state.spotifyResult
            })}} type="link"></Button>
            <Button onClick={() => openExternal(record.link)} icon="play-circle" type="link"></Button>
          </div>
        )
      }
    ]

    return (
      <div>
        <div className="query">
          {
            this.state.loading ? (
              <Spin indicator={<Icon type="loading" style={{ fontSize: 64 }} spin />} />
            ) : this.state.spotifyResult === '' ? (
              <Typography.Text style={{fontSize: '1.5rem'}}>Your search did not match any results</Typography.Text>
            ) : (
              <div className="container">
                {
                  this.state.spotifyResult === null ? (
                    <AudioInfo
                      name={this.state.youtubeResult[0].title}
                      artist={this.state.youtubeResult[0].channelTitle}
                      albumArt={defaultArtwork}/>
                  ) :
                    (<AudioInfo {...this.state.spotifyResult}/>)
                }
                <div className="results">
                  <Typography.Text className="heading">Search Results</Typography.Text>
                  <Table columns={colums} rowKey="id" pagination={false} dataSource={this.state.youtubeResult}></Table>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default connect(null, { addToQueue })(withRouter(View));
