import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import {
  Input
} from 'antd';

import logo from '@/assets/audius_big.png';

class View extends Component {

  handleChange = event => {
    this.setState({
      query: event.target.value
    })
  };

  handleSearch = (value) => {
    this.props.history.push({
      pathname: 'search',
      search: queryString.stringify(value)
    })
  }

  render() {
    return (
      <div className="home">
        <img 
          src={logo} 
          alt="Audius"
        />
        <Input.Search
          placeholder="Enter Song Name, Spotify or YouTube Link"
          onSearch={this.handleSearch}
        />
      </div>
    );
  }
}

export default withRouter(View);
