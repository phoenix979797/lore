var React = require('react');

module.exports = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              Lore Tutorial
            </div>
          </div>
        </div>
      </nav>
    );
  }
});
