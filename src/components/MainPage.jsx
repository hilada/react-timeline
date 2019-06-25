import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MainPage extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              arial-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <div className="navbar-nav">
            <NavLink className='nav-item nav-link' to="/logout">Logout</NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainPage;
