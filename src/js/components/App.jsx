import React from 'react';
import Header from 'js/components/layout/Header';
import { Link } from 'react-router';

import 'scss/components/app';

const App = ({ children }) => (
  <div className="app">
    <Header />
    <div>
      <Link to="/github-repos">
        Search GitHub Repositories
      </Link>
    </div>
    <div>
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
