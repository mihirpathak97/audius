import React from 'react';

class ErrorBoundary extends React.Component {
  
  state = {
    hasError: false
  }

  componentDidMount() {
    console.log('well')
  }

  componentDidCatch(error, info) {
    console.log(error)
    // You can also log the error to an error reporting service
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;