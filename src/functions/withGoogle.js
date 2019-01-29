import React from 'react';

function withGoogle(Component) {
  return class extends React.Component {
    state = {
      google: null,
    }

    componentDidMount() {
      if (window.tomtom) {
        this.init();
      } else {
        window.addEventListener('googleReady', this.init);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('googleReady', this.init);
    }

    init = () => {
      setTimeout(() => {
        const { google } = window;

        this.setState({ google });
      }, 100);
    }

    render() {
      const { google } = this.state;
      return <Component google={google} {...this.props} />;
    }
  };
}

export default withGoogle;
