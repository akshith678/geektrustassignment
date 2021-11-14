import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

import { Component } from "react";
import UsersList from "./components/UsersList";

import "./App.css";

class App extends Component {
  state = {
    searchInput: "",
    userDetailsList: [],
    page: 1,
  };

  componentDidMount() {
    this.getUsersData();
  }

  getUsersData = async () => {
    const { page } = this.state;
    const limit = 10;
    const offset = (page - 1) * limit;
    const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json?offset=${offset}&limit=${limit}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const fetchedData = await response.json();
    const formattedData = fetchedData.map((list) => ({
      id: list.id,
      name: list.name,
      email: list.email,
      role: list.role,
    }));

    this.setState({
      userDetailsList: formattedData,
    });
  };

  onChangeSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  onClickLeftArrow = () => {
    const { page } = this.state;
    if (page > 1) {
      this.setState(
        (prevState) => ({
          page: prevState.page - 1,
        }),
        this.getUsersData
      );
    }
  };

  onClickRightArrow = () => {
    const { page } = this.state;
    if (page <= 4) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }),
        this.getUsersData
      );
    }
  };

  onDeleteUser = (id) => {
    const { userDetailsList } = this.state;
    const filteredUserData = userDetailsList.filter(
      (eachUser) => eachUser.id !== id
    );
    this.setState({ userDetailsList: filteredUserData });
  };

  onClickCheckbox = (event) => {
    const { userDetailsList } = this.state;
    userDetailsList.forEach((list) => (list.isChecked = event.target.checked));
    this.setState({ userDetailsList: userDetailsList });
  };

  render() {
    const { searchInput, userDetailsList, page } = this.state;
    console.log(searchInput);
    const searchResult = userDetailsList.filter(
      (eachUser) =>
        eachUser.name.includes(searchInput) ||
        eachUser.email.includes(searchInput) ||
        eachUser.role.includes(searchInput)
    );
    return (
      <div>
        <div className="search-container">
          <input
            type="search"
            onChange={this.onChangeSearchInput}
            value={searchInput}
            placeholder="search by Name or Email or Role"
            className="search-bar"
          />
        </div>

        <div className="head-container">
          <input type="checkbox" onChange={this.onClickCheckbox} />
          <h1>Name</h1>
          <h1>Email</h1>
          <h1>Role</h1>
          <h1>Actions</h1>
        </div>
        <hr />
        <div>
          <ul className="list-container">
            {searchResult.map((eachUser) => (
              <UsersList
                onDeleteUser={this.onDeleteUser}
                userDetails={eachUser}
                key={eachUser.id}
              />
            ))}
          </ul>
          <div className="bottom-container">
            <button className="button-delete" type="button">
              Delete all
            </button>
            <div className="pagination">
              <button
                testid="pagination-left-button"
                className="button"
                type="button"
                onClick={this.onClickLeftArrow}
              >
                <RiArrowDropLeftLine className="arrow" />
              </button>
              <p testid="active-page-number" className="page-numbers">
                {page}
              </p>
              <button
                testid="pagination-right-button"
                className="button"
                type="button"
                onClick={this.onClickRightArrow}
              >
                <RiArrowDropRightLine className="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
