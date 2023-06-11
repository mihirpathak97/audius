import React from 'react'

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error: any) {
    console.log(error)
    this.setState({
      hasError: true,
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
