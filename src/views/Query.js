import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../components/TopAppBar';

import { withRouter } from 'react-router-dom';

import TrackContainer from '../components/TrackContainer';
import DialogBox from '../components/Dialog';

class Query extends Component {

  state: {
    query: ''
  }

  // Empty Array to hold search results as react child elements
  searchResultsArray = []

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
        return this.renderDialog("An Error Occured!", "MESSAGE: " + err);
      }

      YTSearch(result.title, (error, resp) => {
        if (error) {
          return this.renderDialog("An Error Occured!", "MESSAGE: " + error);
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
      <div className="App">
        <TopAppBar title="Search" showMenu={false} showBackIcon={true} />
        { /*<h1 style={{paddingTop: 50, paddingBottom: 30}}>You searched for "{decodeURI(this.state.query)}"</h1> */ }
        <div id="container">

        </div>
      </div>
    );
  }
}

export default withRouter(Query);
