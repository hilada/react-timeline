import React from "react";
import moment from "moment";

const Level = props => {
  
  let startPoint = moment(props.startPoint).format("X");
  let endPoint = moment(props.endPoint).format("X");
  

  const arrayOfSessions = props.data.filter(
    obj =>
      (moment(obj.startTime).format("X") >= startPoint &&
        moment(obj.startTime).format("X") <= endPoint) ||
      (moment(obj.endTime).format("X") >= startPoint &&
        moment(obj.endTime).format("X") <= endPoint)
  );

  const modifArrayOfSessions = arrayOfSessions.map(obj => {
    if (moment(obj.startTime).format("X") < startPoint) {
      obj.startTime = props.startPoint;
    }
    if (moment(obj.endTime).format("X") > endPoint) {
      obj.endTime = props.endPoint;
    }
    return obj;
  });

  const countWidthOfProgress = (startTime, endTime) => {
    const activeProgressSize = endTime - startTime;
    const progressSize = moment(props.endpoint).format("X") - moment(props.startPoint).format("X");
    const percentage = (activeProgressSize / progressSize) * 100;

  
    return { width: `${percentage}%` };
  };

  let progressDivs = modifArrayOfSessions.map(obj => {
    try {
      if (moment(obj.startTime).format("X") == startPoint)
        return (
          <div
            key={moment(obj.endTime).format("X")*2}
            className="progress-bar progress-bar-striped bg-success"
            style={countWidthOfProgress(
              moment(obj.startTime).format("X"),
              moment(obj.endTime).format("X")
            )}
          />
        );
      return (
        <React.Fragment key={startPoint*5}>
          <div
            key={moment(obj.endTime).format("X")*3}
            className="progress-bar progress-bar-striped bg-warning"
            style={countWidthOfProgress(
              startPoint,
              moment(obj.startTime).format("X")
            )}
          />
          <div
            key={moment(obj.endTime).format("X")*6}
            className="progress-bar progress-bar-striped bg-success"
            style={countWidthOfProgress(
              moment(obj.startTime).format("X"),
              moment(obj.endTime).format("X")
            )}
          />
        </React.Fragment>
      );
    } catch (error) {
    } finally {
      startPoint = moment(obj.endTime).format("X");
    }
  });

  return <div className="progress">{progressDivs}</div>;
};

export default Level;
