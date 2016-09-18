import React from 'react';
import Header from 'js/components/layout/Header';
import Nav from 'js/components/layout/Nav';

import 'scss/components/app';

const App = ({ children }) => (
  <div className="app">
    <Header />
    <Nav />
    <div className="wrapper">
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
