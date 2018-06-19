import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../components/TopAppBar';

import { withRouter } from 'react-router-dom';

import TrackContainer from '../components/TrackContainer';
import DialogBox from '../components/Dialog';

class Query extends Component {

  state = {
    query: ''
  }

  componentWillMount() {
    this.setState({
      query: this.props.location.search.split('&')[1].substr(4)
    })
  }

  componentDidMount() {
    var Spotify = require('../modules/SpotifyWebApi');
    var YTSearch = require('../modules/YTSearch');

    Spotify.searchTrack(decodeURI(this.state.query), (err, result) => {
      if (err) {
        return this.renderDialog("An Error Occured!", err);
      }

      YTSearch(result.title, (error, resp) => {
        if (error) {
          return this.renderDialog("An Error Occured!", error);
        }

        // Render TrackContainer
        ReactDOM.render(
         <TrackContainer
          title={result.title}
          artist={result.trackArtist}
          albumArt={result.albumArt}
          spotifyMetadata={result}
          youtubeLink={resp[0].link}/>,
         document.getElementById('container')
       );

      })
    })
  }

  renderDialog = (title, message) => {
    ReactDOM.render(
     <DialogBox
      dialogTitle={title}
      dialogMessage={message}/>,
     document.getElementById('container')
   );
  }

  render() {
    return (
      <div>
        <TopAppBar title="Search" showMenu={false} showBackIcon={true} />
        <div id="container"></div>
      </div>
    );
  }
}

export default withRouter(Query);
