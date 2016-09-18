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
    isLoading: PropTypes.bool.isRequired,
    repositories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    isLoading: false,
    repositories: []
  }

  constructor(props) {
    super(props);

    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.refs.githubUsername.value;
    this.props.dispatch(actions.loadRepos(username));

    this.refs.form.reset();
  }

  renderListRepository(repos) {
    return (
      <li key={repos.id}>
        {repos.name}
      </li>
    );
  }

  render() {
    const { isLoading, repositories } = this.props;

    return (
      <div className="container">
        <form ref="form" className="form form-inline row" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter github username"
              className="form-control"
              ref="githubUsername"
            />
          </div>
          <button className="btn btn-primary" type="submit">load</button>
        </form>
        {isLoading ?
          <div id="loading" className="row alert alert-info hide">
            <i className="fa fa-spin fa-cog"></i> ...loading repos...
          </div>
          : null}
        <div className="row">
          Number of Repository: {repositories.length}
        </div>
        <div className="row">
          <ul className="list-group">
            {this.props.repositories.map(this.renderListRepository)}
          </ul>
        </div>
      </div>
    );
  }
}

// export default GitHubResposView;
export default connect(mapStateToProps)(GitHubResposView);
