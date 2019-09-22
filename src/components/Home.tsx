import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import queryString from 'query-string';

import {
  Input
} from 'antd';

const logo = require('../assets/audius_big.png');

interface Props extends RouteComponentProps<any> {
  // 
}

const View: React.FunctionComponent<Props> = ({
  history
}) => {

  function handleSearch (value: String) {
    history.push({
      pathname: 'search',
      search: queryString.stringify({
        query: value
      })
    })
  }

  return (
    <div className="home">
      <img
        src={logo}
        alt="Audius"
      />
      <Input.Search
        placeholder="Enter Song Name, Spotify or YouTube Link"
        onSearch={handleSearch}
      />
    </div>
  );
}

export default withRouter(View);
