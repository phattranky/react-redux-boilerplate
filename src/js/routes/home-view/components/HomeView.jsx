import React, { Component } from 'react';

import 'scss/routes/home-view';
import posts from 'js/data/posts';

class HomeView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts
    };
  }

  render() {
    return (
      <div className="photo-grid">
        Hello World PhotoGrid
      </div>
    );
  }
}
export default HomeView;
