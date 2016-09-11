import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../action-creators/github-repos-view';

// const GitHubResposView = () => (
//   <div className="container">
//     <form action="" className="form form-inline row">
//       <div className="form-group">
//         <input
//           type="text"
//           placeholder="Enter github username"
//           className="form-control"
//           id="myInput"
//         />
//       </div>
//       <button className="btn btn-primary" type="submit">load</button>
//     </form>
//     <div id="loading" className="row alert alert-info hide">
//       <i className="fa fa-spin fa-cog"></i> ...loading repos...
//     </div>
//     <div className="row">
//       <ul className="list-group"></ul>
//     </div>
//   </div>
// );

function mapStateToProps(state) {
  return state['github-repos-view/github-repos-view'];
}

class GitHubResposView extends Component {

  static propTypes = {
    repositories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    repositories: []
  }

  componentWillMount() {
    this.props.dispatch(actions.loadRepos('phattranky'));
  }

  render() {
    const { repositories } = this.props;

    return (
      <div className="container">
        <form action="" className="form form-inline row">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter github username"
              className="form-control"
              id="myInput"
            />
          </div>
          <button className="btn btn-primary" type="submit">load</button>
        </form>
        <div id="loading" className="row alert alert-info hide">
          <i className="fa fa-spin fa-cog"></i> ...loading repos...
        </div>
        <div className="row">
          Number of Repository: {repositories.length}
        </div>
        <div className="row">
          <ul className="list-group"></ul>
        </div>
      </div>
    );
  }
}

// export default GitHubResposView;
export default connect(mapStateToProps)(GitHubResposView);
