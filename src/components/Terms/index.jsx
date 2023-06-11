import React, { Component } from 'react'
import { Typography } from 'antd'

class View extends Component {
  render() {
    return (
      <div>
        <div className="terms">
          <Typography.Title className="title">Terms of Use</Typography.Title>

          <Typography.Text>
            Copyright (c) {new Date().getFullYear()} Mihir Pathak All Rights
            Reserved.
          </Typography.Text>

          <Typography.Title style={{ color: 'hsl(348, 100%, 61%)' }}>
            This application is subject to YouTube's terms of use
          </Typography.Title>

          <Typography.Text>
            This application is meant for educational purposes only. The
            developer is not responsible in any way for any form of improper or
            illegal usage.
          </Typography.Text>
        </div>
      </div>
    )
  }
}

export default View
