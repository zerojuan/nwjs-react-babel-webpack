import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className = "greeting">
        <h1>Hello, { this.props.name }!</h1>
        <p>This is bad, real bad. Michael Jackson this doens</p>
      </div>
    );
  }
});
