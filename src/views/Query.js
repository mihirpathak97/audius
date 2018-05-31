import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../components/TopAppBar';
import QueryField from '../components/QueryField';

import { withRouter } from 'react-router-dom';

import VideoContainer from '../components/VideoContainer';

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
    // Run YouTube search
    var search = require('youtube-search');
    var { YouTube } = require('../modules/YouTube');

    search(this.state.query, YouTube.search, function(err, results) {
      if(err) return console.log(err);

      // let container = document.getElementById('container');
      // let childern = '';

      const queryResults = results.map((item) =>
        <VideoContainer
          title={item.title}
          link={item.link}  />
      );

      ReactDOM.render(
        <div>{queryResults}</div>,
        document.getElementById('container')
      );
    });
  }

  render() {
    return (
      <div className="App">
        <TopAppBar title="Search" showMenu={false} showBackIcon={true} />
        <h1 style={{paddingTop: 50, paddingBottom: 30}}>You searched for "{decodeURI(this.state.query)}"</h1>
        <div id="container">
        </div>

      </div>
    );
  }
}

export default withRouter(Query);
