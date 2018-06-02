import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../components/TopAppBar';
import QueryField from '../components/QueryField';

import { withRouter } from 'react-router-dom';

import TrackContainer from '../components/TrackContainer';

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

    Spotify.searchTrack(decodeURI(this.state.query), function (err, result) {
      if (err) {
        console.log(err);
      }
      ReactDOM.render(
       <TrackContainer
        title={result.title}
        artist={result.trackArtist}
        albumArt={result.albumArt}/>,
       document.getElementById('container')
     );
    })
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
