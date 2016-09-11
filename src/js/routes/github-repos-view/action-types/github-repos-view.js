 /**
  * GitHub Repos view actions
  */

import { createActionTypes } from '../../../utilities/action-type-factory';

const GITHUB_REPOS_VIEW_ACTIONS = createActionTypes('GITHUB_REPOS', [
  'LOAD_REPOS', // Make request get repos by username
  'LOADING_CHANGED',
  'ADD_REPOS'
]);

export default GITHUB_REPOS_VIEW_ACTIONS;
