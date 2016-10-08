var React = require('react');
var moment = require('moment');

module.exports = lore.connect(function(getState, props) {
  return {
    user: getState('user.byId', {
      id: props.tweet.data.user
    })
  }
})(
React.createClass({
  displayName: 'Tweet',

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getStyles: function() {
    return {
      avatar: {
        width: '32px',
        border: '1px solid gray'
      },
      imageContainer: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '32px'
      },
      contentContainer: {
        display: 'inline-block',
        marginLeft: '8px',
        maxWidth: '85%'
      },
      title: {
        lineHeight: '32px',
        display: 'inline-block'
      },
      text: {
        marginBottom: '5px'
      },
      timestamp: {
        display: 'inline-block',
        marginLeft: '8px',
        color: '#999',
        fontSize: '14px'
      }
    }
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;
    var styles = this.getStyles();
    var timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

    return (
      <li className="list-group-item">
        <div style={styles.imageContainer}>
          <img
            className="img-circle"
            src={user.data.avatar}
            style={styles.avatar} />
        </div>
        <div style={styles.contentContainer}>
          <h4 className="list-group-item-heading" style={styles.title}>
            {user.data.nickname}
          </h4>
          <h4 className="list-group-item-heading" style={styles.timestamp}>
            {'- ' + timestamp}
          </h4>
          <p className="list-group-item-text" style={styles.text}>
            {tweet.data.text}
          </p>
        </div>
      </li>
    );
  }
})
);
