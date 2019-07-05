import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <nav className="navbar navbar-default navbar-static-top header">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Lore Quickstart
          </Link>
        </div>
      </div>
    </nav>
  );
}
