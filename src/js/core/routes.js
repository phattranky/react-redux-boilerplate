/**
 * App routes
 * @module core/routes
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../components/App';
import HomeView from '../routes/home-view/components/HomeView';
import GitHubReposView from '../routes/github-repos-view/components/GitHubReposView';

// List route configuration
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="/github-repos" component={GitHubReposView} />
  </Route>
);

// Export the app routes
export default routes;
