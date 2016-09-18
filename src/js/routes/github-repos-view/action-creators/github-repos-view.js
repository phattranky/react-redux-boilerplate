/**
 * GitHub Repos view action creators
 */
import fetch from 'isomorphic-fetch';

import GITHUB_REPOS_VIEW_ACTIONS from '../action-types/github-repos-view';

export const loadRepos = (username) => (
  (dispatch) => {
    const url = `https://api.github.com/users/${username}/repos`;

    dispatch({
      type: GITHUB_REPOS_VIEW_ACTIONS.LOADING_CHANGED,
      data: {
        isLoading: true
      }
    });

    fetch(url)
      .then((result) => {
        dispatch({
          type: GITHUB_REPOS_VIEW_ACTIONS.LOADING_CHANGED,
          data: {
            isLoading: false
          }
        });

        if (result.status === 200) {
          return result.json();
        }

        throw new Error('request failed');
      })
      .then((jsonResult) => {
        console.log('Dispatch JSON Result', jsonResult);
        dispatch({
          type: GITHUB_REPOS_VIEW_ACTIONS.ADD_REPOS,
          data: {
            repositories: jsonResult
          }
        });
      })
      .catch((err) => {
        alert(`error get repository${err}`);
      });
  }
);

export const loadingChanged = (data) => (
  {
    type: GITHUB_REPOS_VIEW_ACTIONS.LOADING_CHANGED,
    data
  }
);

export const addRepos = (data) => (
  {
    type: GITHUB_REPOS_VIEW_ACTIONS.ADD_REPOS,
    data
  }
);

