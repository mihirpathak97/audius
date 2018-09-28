import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';

import AudioInfo from './AudioInfo';
import DialogBox from '../Dialog';
import PlayAudio from './PlayAudio';
import DownloadAudio from './DownloadAudio';

import { queryCheck } from '../../modules/queryCheck';

const styles = {
  videosContainer: {
    width: '95%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 50
  }
}

class View extends Component {

  state = {
    spotifyResult: '',
    youtubeResult: '',
    showInfo: false,
    dialogOpen: false,
    dialogTitle: "",
    dialogMessage: ""
  }

  componentDidMount() {
    var log = require('log');
    queryCheck(this.props.query).then(response => {
      console.log(response);
    }).catch(error => {
      if (error.code.includes('404')) {
        this.setState({
          showInfo: true
        })
      }
    });
    // var Spotify = require('../../modules/SpotifyWebApi');
    // var YTSearch = require('../../modules/YTSearch');
    //
    // // Search for track in Spotify
    // Spotify.searchTrack(this.props.query, (err, result) => {
    //   if (err) {
    //     // Refresh Access Token
    //     if(typeof(err) === 'object' && JSON.stringify(err).message === "The access token expired") {
    //       Spotify.getAccessToken();
    //       return;
    //     }
    //     log.error('Query', JSON.stringify(err));
    //     this.setState({
    //       showInfo: true
    //     })
    //     return this.renderDialog("An Error Occured!", typeof (err) === 'string' ? err : JSON.stringify(err));
    //   }
    //
    //   // Check if Spotify search found anything
    //   if(result === null) {
    //     this.setState({
    //       showInfo: true
    //     })
    //     return;
    //   }
    //
    //   // Use that data to run YouTube search
    //   YTSearch(result, (error, resp) => {
    //     if (error) {
    //       log.error('Query', JSON.stringify(error));
    //       return this.renderDialog("An Error Occured!", error);
    //     }
    //     this.setState({
    //       spotifyResult: result,
    //       youtubeResult: resp,
    //       showInfo: true,
    //     });
    //   });
    //
    // });
  }

  renderDialog = (title, message) => {
    this.setState({
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    })
  }

  render() {
    const { classes } = this.props;
    let result = this.state.spotifyResult;
    let videoContainer;
    if(this.state.youtubeResult !== '') {
      videoContainer = this.state.youtubeResult.map((item) =>
        <TableRow key={item.id}>
          <TableCell>
            {item.title}
          </TableCell>
          <TableCell>
            <PlayAudio id={item.id} />
          </TableCell>
          <TableCell>
            <DownloadAudio youtubeLink={item.link} spotifyMetadata={this.state.spotifyResult}/>
          </TableCell>
        </TableRow>
      )
    }
    return (
      <div>
        <div id="container">
          {
            this.state.showInfo ? (
              this.state.spotifyResult === '' ? (
                <Typography variant="title" style={{marginTop: 250}}>Your search did not match any results</Typography>
              ) : (
                <div style={{overflow: 'auto'}}>
                  <AudioInfo
                    classes={{}}
                    title={result.title}
                    artist={result.trackArtist}
                    albumArt={result.albumArt}/>
                  <Typography variant="title" style={{textAlign: 'left', marginLeft: 50, marginTop: 270, marginBottom: 30}}>Search Results</Typography>
                  <Table className={classes.videosContainer}>
                    <TableBody>
                      {videoContainer}
                    </TableBody>
                  </Table>
                </div>
              )
            ) : (<CircularProgress style={{ marginTop: 250 }} thickness={5} />)
          }
        </div>
        {
          this.state.dialogOpen ? <DialogBox dialogTitle={this.state.dialogTitle} dialogMessage={this.state.dialogMessage} /> : null
        }
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  query: state.searchQuery.query
})

export default connect(mapStateToProps, {})(withStyles(styles)(View));
