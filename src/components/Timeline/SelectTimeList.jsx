import React, { Component } from "react";
import "./SelectTimeList.css";

class SelectTimeList extends Component {
  state = {
    time: null
  };

  handleChangeTime = event => {
    let time = this.state.time;
    time = event.target.value;

    this.setState({ time });
  };
  render() {
    return (
      <div className="selectTimeList">
        <div className="close" onClick={this.props.hideSelectTimeList}>
          &times;
        </div>
        <input
          type="time"
          id="time"
          min="00:00"
          max="23:59"
          className="form-control mb-2"
          onChange={this.handleChangeTime}
        />
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={this.props.hideSelectTimeList}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.props.onButtonClick(this.state.time)}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default SelectTimeList;
