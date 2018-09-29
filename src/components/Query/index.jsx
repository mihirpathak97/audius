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
    queryCheck(this.props.query).then(response => {
      this.setState({
        spotifyResult: response.spotifyResult,
        youtubeResult: response.youtubeResult,
        showInfo: true,
      });
    }).catch(error => {
      this.setState({
        showInfo: true
      })
      if (typeof(error.code) !== 'string') {
        this.renderDialog("An Error Occured!", error.message)
      }
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
            <DownloadAudio youtubeMetadata={item} spotifyMetadata={this.state.spotifyResult}/>
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
                  {
                    result === null ? (
                      <AudioInfo
                        classes={{}}
                        title={this.state.youtubeResult[0].title}
                        artist={this.state.youtubeResult[0].channelTitle}
                        albumArt={""}/>
                    ) :
                      (<AudioInfo
                        classes={{}}
                        title={result.title}
                        artist={result.trackArtist}
                        albumArt={result.albumArt}/>)
                  }
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
