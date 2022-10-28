import React from "react";
import PropTypes from "prop-types";

import "./CreateTeammateModal.css";

import { createTeammate } from "./actions";

export default class CreateTeammateModal extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: false,
      lastName: "",
      lastNameError: false,
      title: "",
      titleError: false,
      story: "",
      storyError: false,
      favoriteColor: "",
      photoUrl: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(name, val) {
    this.setState({ ...this.state, [name]: val });
  }

  async onSubmit() {
    this.setState({
      ...this.state,
      firstNameError: false,
      lastNameError: false,
      titleError: false,
      storyError: false,
    });
    if (!this.state.firstName)
      return this.setState({ ...this.state, firstNameError: true });
    if (!this.state.lastName)
      return this.setState({ ...this.state, lastNameError: true });
    if (!this.state.title)
      return this.setState({ ...this.state, titleError: true });
    if (!this.state.story)
      return this.setState({ ...this.state, storyError: true });
    const teammate = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      title: this.state.title,
      story: this.state.story,
      favoriteColor: this.state.favoriteColor,
      photoUrl: this.state.photoUrl,
    };
    this.props.handleClose();
    this.props.add(teammate)
    await createTeammate(teammate);
  }

  render() {
    const fields = [
      { display: "First Name", name: "firstName", errorName: "firstNameError" },
      { display: "Last Name", name: "lastName", errorName: "lastNameError" },
      { display: "Title", name: "title", errorName: "titleError" },
      { display: "Story", name: "story", errorName: "storyError" },
      { display: "Favorite Color", name: "favoriteColor" },
      { display: "Photo URL", name: "photoUrl" },
    ];
    return this.props.show ? (
      <div className="modal display-block">
        <section className="modal-main">
          <button type="button" onClick={this.props.handleClose}>
            Close
          </button>

          <form>
            <h1>Create New Teammate</h1>
            {fields.map((v, i) => {
              return (
                <div key={i}>
                  <span>{v.display + ": "}</span>
                  <input
                    type="text"
                    value={this.state[v.name]}
                    onChange={(e) => this.handleChange(v.name, e.target.value)}
                  />
                  {this.state[v.errorName] ? (
                    <p>{`${v.display} is required`}</p>
                  ) : null}
                </div>
              );
            })}

            <button type="button" onClick={this.onSubmit}>
              Submit
            </button>
          </form>
        </section>
      </div>
    ) : null;
  }
}
