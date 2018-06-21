// @flow

import React from "react";
import { Button } from "antd";
import EditCheck from "./EditCheck";
import PollsGraph from "./PollsGraph";

const CheckInfo = (props: {
  ...$Exact<Check>,
  saveCheck: Function,
  deleteCheck: Function
}) => (
  <div>
    <div>
      <p>
        <strong>Uri: </strong>
        <a href={props.uri} target="_blank">
          {props.uri}
        </a>
      </p>
      <p>
        <strong>Interval: </strong>
        {props.interval} ms
      </p>
      <p>
        <strong>Availability: </strong>
        {(
          props.polls.filter(poll => poll.availability === "UP").length /
          props.polls.length *
          100
        ).toFixed(2)}%
      </p>
    </div>
    <div>
      <EditCheck
        mainVerb="Edit"
        check={{ name: props.name, uri: props.uri, interval: props.interval }}
        saveCheck={props.saveCheck}
      />
      <Button onClick={() => props.deleteCheck({ name: props.name })}>
        Delete
      </Button>
    </div>
    <div>
      <PollsGraph dataPolls={props.polls} />
    </div>
  </div>
);

export default CheckInfo;
