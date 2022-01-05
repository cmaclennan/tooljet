import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorProperties: {} };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ errorProperties: this.props.properties ?? this.props.properties });
    console.log(error, errorInfo);
  }

  compareProperties() {
    if (this.props.properties) {
      if (JSON.stringify(this.state.errorProperties) !== JSON.stringify(this.props.properties)) {
        this.setState({ hasError: false });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      this.compareProperties();
      return this.props.showFallback ? <h2>Something went wrong.</h2> : <div></div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
