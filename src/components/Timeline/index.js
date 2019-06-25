import React, { Component } from "react";
import moment from "moment";

import SelectTimeList from "./SelectTimeList";
import "./Timeline.css";
import Calendar from "./Calendar";
import Level from "./Levels/Level/Level";

class Timeline extends Component {
  state = {
    currentDate: moment(),
    showCalendar: false,
    showTimeList: false,
    interval: { timeSpan: "days", token: "DD", numOfCols: 2 }
  };

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();
  date = () => {
    return this.state.currentDate.format("DD MMMM Y");
  };
  start;

  handleZoomIn = () => {
    let timeSpan = ["days", "hours", "minutes", "seconds"];
    let token = ["DD", "HH", "mm", "ss"];
    let divisionArr = [24, 60, 60, 1];
    let interval = { ...this.state.interval };

    let index = timeSpan.indexOf(interval.timeSpan);
    let wholeTime = divisionArr.slice(index).reduce((x, y) => x * y);

    interval.timeSpan = timeSpan[index + 1];
    interval.token = token[index + 1];

    this.setState({ interval });
  };

  handleZoomOut = () => {
    let timeSpan = ["days", "hours", "minutes", "seconds"];
    let token = ["DD", "HH", "mm", "ss"];
    let interval = { ...this.state.interval };

    let index = timeSpan.indexOf(interval.timeSpan);
    interval.timeSpan = timeSpan[index - 1];
    interval.token = token[index - 1];

    this.setState({ interval });
  };

  handleNumChange = ({ currentTarget }) => {
    let interval = { ...this.state.interval };
    interval.numOfCols = currentTarget.value;

    this.setState({ interval });
  };

  handleDateChoose = () => {
    this.setState(prevState => {
      return { showCalendar: !prevState.showCalendar };
    });
  };

  handleDateChange = date => {
    this.setState({ showCalendar: false, currentDate: date });
  };

  renderArray = ({ timeSpan, token, numOfCols }) => {
    const num = numOfCols % 2;

    let currentDate = Object.assign({}, this.state.currentDate);
    let endMoment = moment(currentDate).add(
      Math.floor(numOfCols / 2) + num,
      timeSpan
    );

    let startMoment = moment(currentDate).subtract(
      Math.floor(numOfCols / 2),
      timeSpan
    );

    let arrayOfMoments = [];
    do {
      arrayOfMoments.push(startMoment);
      startMoment = moment(startMoment).add(1, timeSpan);
    } while (startMoment.format(token) !== endMoment.format(token));
    return arrayOfMoments;
  };

  renderColumns = (arr, token) => {
    return arr.map(moment => {
      return (
        <td className="text-center" key={moment.format(token)}>
          {moment.format(token)}
        </td>
      );
    });
  };

  renderLevels = (level, num, arrayOfMoments) => {
    const data = [
      {
        startTime: moment().set({
          year: 2019,
          month: 1,
          date: 21,
          hour: 13,
          minute: 28,
          second: 31
        }),
        endTime: moment().set({
          year: 2019,
          month: 1,
          date: 21,
          hour: 13,
          minute: 45,
          second: 35
        })
      },
      {
        startTime: moment().set({
          year: 2019,
          month: 1,
          date: 21,
          hour: 13,
          minute: 20,
          second: 30
        }),
        endTime: moment().set({
          year: 2019,
          month: 1,
          date: 21,
          hour: 13,
          minute: 27,
          second: 35
        })
      },
      {
        startTime: moment().set({
          year: 2019,
          month: 1,
          date: 21,
          hour: 13,
          minute: 56,
          second: 48
        }),
        endTime: moment().set({
          year: 2019,
          month: 1,
          date: 21,
          hour: 14,
          minute: 2,
          second: 35
        })
      }
    ];

    return (
      <tr key={level}>
        <th scope="row">Level: {level}</th>
        <td colSpan={num} style={{ paddingRight: 0, paddingLeft: 0 }}>
          <Level
            startPoint={arrayOfMoments[0]}
            endPoint={arrayOfMoments[arrayOfMoments.length - 1]}
            data={data}
          />
        </td>
      </tr>
    );
  };

  handleHoursChange = () => {
    let showList = this.state.showTimeList;

    this.setState({ showTimeList: !showList });
  };

  handleTimeChoose = data => {
    data = data.split(":");
    let currentDate = { ...this.state.currentDate };
    currentDate = moment(currentDate)
      .hours(+data[0])
      .minutes(+data[1]);
    let showList = this.state.showTimeList;

    this.setState({ currentDate, showTimeList: !showList });
  };

  render() {
    let renderedArray = this.renderArray(this.state.interval);
    let columsWithNumbers = this.renderColumns(
      renderedArray,
      this.state.interval.token
    );

    const levels = this.renderLevels(
      "level1",
      this.state.interval.numOfCols,
      renderedArray
    );

    return (
      <div>
        <h1 className="text-center">Timeline</h1>

        <div className="timeline-nav">
          <label htmlFor="dateChoose">Date: </label>
          <input
            id="dateChoose"
            type="text"
            className="m-2"
            onClick={this.handleDateChoose}
            placeholder={this.state.currentDate.format("DD MMMM Y")}
          />
          {this.state.showCalendar && (
            <Calendar
              currentDate={this.state.currentDate}
              onButtonClick={this.handleDateChange}
            />
          )}
          <button
            onClick={this.handleZoomIn}
            type="button"
            className="btn btn-warning m-2"
            disabled={this.state.interval.timeSpan === "seconds"}
          >
            Zoom in
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={this.handleZoomOut}
            disabled={this.state.interval.timeSpan === "days"}
          >
            Zoom out
          </button>
          <label htmlFor="numOfCols">Number of Columns:</label>
          <input
            id="numOfCols"
            className="m-2"
            type="number"
            onChange={this.handleNumChange}
            value={this.state.interval.numOfCols}
            placeholder="2"
          />
        </div>

        <div className="timeline-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" />
                <th
                  scope="col"
                  className="text-center"
                  colSpan={this.state.interval.numOfCols}
                >
                  {this.date()}{" "}
                  <span className="hours" style={{cursor: 'pointer'}} onClick={this.handleHoursChange}>
                    {this.state.currentDate.format("HH:mm")}
                  </span>
                  {this.state.showTimeList && (
                    <SelectTimeList
                      currentTime={this.state.currentDate}
                      hideSelectTimeList={this.handleHoursChange}
                      onButtonClick={data => this.handleTimeChoose(data)}
                    />
                  )}
                </th>
              </tr>
              <tr>
                <th className="text-center">{this.state.interval.timeSpan}</th>
                {columsWithNumbers}
              </tr>
            </thead>
            <tbody>{levels}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Timeline;
