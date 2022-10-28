import React from "react";
import axios from "axios";
import TeamMember from "../TeamMember";
import CreateTeammateModal from "../CreateTeammateModal";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      loading: true,
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.add = this.add.bind(this);
  }

  async componentDidMount() {
    try {
      await this.fetchInitialData();
    } catch (error) {
      // try again after half a second if fails due to race condition
      console.log("retrying initial data request...");
      setTimeout(async () => {
        await this.fetchInitialData();
      }, 500);
    }
  }

  async fetchInitialData() {
    const response = await axios.get("/team");
    this.setState({
      team: response.data,
      loading: false,
    });
  }

  toggleModal() {
    this.setState({ ...this.state, showModal: !this.state.showModal });
  }

  add(teammate) {
    this.setState({
      ...this.state,
      showModal: false,
      team: [...this.state.team, teammate],
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="app">
        <CreateTeammateModal
          show={this.state.showModal}
          handleClose={this.toggleModal}
          add={this.add}
        />
        <div className="team-grid" />
        {this.state.team.map((member) => (
          <TeamMember
            key={member.id}
            name={`${member.firstName} ${member.lastName}`}
            title={member.title}
            photoUrl={member.photoUrl}
            story={member.story}
            favoriteColor={member.favoriteColor}
          />
        ))}
        {/* Make this new team member link to your form! */}
        <button className="join-btn" onClick={this.toggleModal}>
          <p className="join-btn-text">Join our team!</p>
        </button>
      </div>
    );
  }
}

export default App;
