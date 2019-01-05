import React, { Component } from "react";
import { getAllJobs } from "../util/APIUtils";
import Job from "./Job";
import LoadingIndicator from "../common/LoadingIndicator";
import { Button, Icon, notification } from "antd";
import { POLL_LIST_SIZE } from "../constants";
import { withRouter } from "react-router-dom";
import "./PollList.css";

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      isLoading: false
    };
    this.getAllJobs = this.getAllJobs.bind(this);
  }

  getAllJobs() {
    let promise;

    promise = getAllJobs();

    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });

    promise
      .then(response => {
        this.setState({
          jobs: response,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.getAllJobs();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      // Reset State
      this.setState({
        jobs: [],
        isLoading: false
      });
      this.getAllJobs();
    }
  }

  render() {
    const jobViews = [];
    console.log(this.state.jobs);
    const data = this.state.jobs;
    // const jobsView = data.map(d => <li key={d.id}>{d.description}</li>);

    return (
      <div className="polls-container">
        {this.state.jobs.map(d => (
          <div class="job-container">
            <h2>
              Job de la <span>{d.user.name} :</span>
            </h2>
            <p>
              <em>Masina, Model, An:</em>
            </p>
            <p>
              <em>Problema:</em> <span key={d.id}>{d.description}</span>
            </p>
            <Button onClick={this.handleLoadMore} className="btn btn-primary">
              Accepta Oferta
            </Button>
          </div>
        ))}

        {!this.state.isLoading === 0 ? (
          <div className="no-polls-found">
            <span>No Jobs Found.</span>
          </div>
        ) : null}
        {!this.state.isLoading ? (
          <div className="load-more-polls">
            <Button
              type="dashed"
              onClick={this.handleLoadMore}
              disabled={this.state.isLoading}
            >
              <Icon type="plus" /> Incarca mai multe
            </Button>
          </div>
        ) : null}
        {this.state.isLoading ? <LoadingIndicator /> : null}
      </div>
    );
  }
}

export default JobList;
