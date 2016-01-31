import React from 'react';

const App = React.createClass({
  displayName: 'App',
  render() {

    return (
      <div>
        <h1>Hello World</h1>
        <div
          style={{
            margin: '8px'
          }}
          >
          {this.props.children}
        </div>
      </div>
    );
  }

});

export default App;
