var React = require('react');
var CreateTweetDialog = require('../dialogs/tweet/Create');

module.exports = React.createClass({
  displayName: 'CreateButton',

  getStyles: function() {
    return {
      createButton: {
        position: 'absolute',
        top: '25px',
        right: '15px',
        zIndex: 1000,
        borderRadius: '100px',
        outline: 'none'
      }
    }
  },

  onClick: function() {
    function createTweet(params) {
      lore.actions.tweet.create(params);
    }

    lore.dialog.show(function() {
      return (
        <CreateTweetDialog onSubmit={createTweet} />
      );
    });
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={styles.createButton}
        onClick={this.onClick}>
        +
      </button>
    );
  }
});
