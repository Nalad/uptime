// @flow

import React from "react";
import { Button, Popconfirm } from "antd";
import EditCheck from "./EditCheck";
import PollsGraph from "./PollsGraph";
import { getMean, getVariance } from "../Utilities";

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
        ).toFixed(5)}%
      </p>
      <p>
        <strong>Latency: </strong>
        <ul>
          <li>
            {getMean(
              props.polls
                .filter(poll => poll.availability === "UP")
                .map(poll => poll.latency)
            ).toFixed(5)}{" "}
            ms - mean
          </li>
          <li>
            {Math.sqrt(
              getVariance(
                props.polls
                  .filter(poll => poll.availability === "UP")
                  .map(poll => poll.latency)
              )
            ).toFixed(5)}{" "}
            ms - standard deviation
          </li>
        </ul>
      </p>
      <PollsGraph key={props.name} dataPolls={props.polls} />
    </div>
    <div>
      <EditCheck
        mainVerb="Edit"
        key={props.name}
        check={{ name: props.name, uri: props.uri, interval: props.interval }}
        saveCheck={props.saveCheck}
      />
      <Popconfirm
        title="Are you sure delete this check?"
        onConfirm={() => props.deleteCheck({ name: props.name })}
      >
        <Button>Delete</Button>
      </Popconfirm>
    </div>
  </div>
);

export default CheckInfo;
