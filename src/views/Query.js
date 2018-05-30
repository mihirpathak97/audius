import React, { Component } from 'react';
import TopAppBar from '../components/TopAppBar';
import QueryField from '../components/QueryField';

import { withRouter } from 'react-router-dom';

class Query extends Component {

  state: {
    query: ''
  }

  componentWillMount() {
    this.setState({
      query: this.props.location.search.split('&')[1].substr(4)
    })
  }

  render() {
    return (
      <div className="App">
        <TopAppBar title="Search" showMenu={false} showBackIcon={true} />
        <h1>You searched for "{this.state.query}"</h1>
      </div>
    );
  }
}

export default withRouter(Query);
