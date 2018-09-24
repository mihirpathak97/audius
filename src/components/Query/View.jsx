import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

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

const styles = {
  videosContainer: {
    width: '95%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 50
  }
}

class Query extends Component {

  state = {
    query: '',
    spotifyResult: '',
    youtubeResult: '',
    showInfo: false,
    dialogOpen: false,
    dialogTitle: "",
    dialogMessage: ""
  }

  componentDidMount() {
    var log = require('log');
    let query = decodeURI(this.props.location.search.split('&')[1].substr(4));
    this.setState({
      query: query
    });
    var Spotify = require('../../modules/SpotifyWebApi');
    var YTSearch = require('../../modules/YTSearch');

    // Search for track in Spotify
    Spotify.searchTrack(query, (err, result) => {
      if (err) {
        // Refresh Access Token
        if(err === "The access token expired") {
          Spotify.getAccessToken();
          return;
        }
        log.error('Query', JSON.stringify(err));
        return this.renderDialog("An Error Occured!", JSON.stringify(err));
      }

      // Check if Spotify search found anything
      if(result === null) {
        this.setState({
          showInfo: true
        })
        return;
      }

      // Use that data to run YouTube search
      YTSearch(result, (error, resp) => {
        if (error) {
          log.error('Query', JSON.stringify(error));
          return this.renderDialog("An Error Occured!", error);
        }
        this.setState({
          spotifyResult: result,
          youtubeResult: resp,
          showInfo: true,
        });
      });

    });
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
                    classes={new Object()}
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

AudioInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Query));
