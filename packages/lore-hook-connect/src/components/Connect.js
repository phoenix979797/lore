import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import connect from '../decorators/connect';
import { result as _result } from 'lore-utils';

export default connect(function(getState, props) {
  return props.callback.apply(null, arguments)
})(
createReactClass({
  displayName: 'Connect',

  propTypes: {
    callback: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]).isRequired
  },

  render: function() {
    const {
      children,
      callback,
      ...other
    } = this.props;

    if (_.isFunction(children)) {
      return _result(children, other);
    }

    return React.cloneElement(children, other);
  }

})
);
