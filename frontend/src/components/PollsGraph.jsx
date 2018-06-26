// @flow

import React from "react";
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  FlexibleWidthXYPlot,
  LineSeries,
  DiscreteColorLegend
} from "react-vis";
import { Button } from "antd";
import Highlight from "./Highlight";
import "../../node_modules/react-vis/dist/style.css";

class PollsGraph extends React.Component<
  { dataPolls: Array<Poll> },
  {
    lastDrawLocation: Object | null,
    series: Array<{
      title: string,
      disabled: boolean,
      data: Array<{ x: Date, y: number }>
    }>
  }
> {
  state = {
    lastDrawLocation: null,
    series: [
      {
        title: "Latency",
        disabled: false,
        data: this.props.dataPolls
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .map(poll => ({
            x: new Date(poll.time),
            y: poll.availability === "UP" ? poll.latency : 0
          }))
      }
    ]
  };

  render() {
    const { series, lastDrawLocation } = this.state;
    return (
      <div className="example-with-click-me">
        <div className="legend">
          <DiscreteColorLegend width={180} items={series} />
        </div>

        <div className="chart no-select">
          <FlexibleWidthXYPlot
            animation
            xDomain={
              lastDrawLocation && [
                lastDrawLocation.left,
                lastDrawLocation.right
              ]
            }
            height={300}
          >
            <HorizontalGridLines />

            <YAxis />
            <XAxis
              tickFormat={v => {
                const d = new Date(v);
                return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
              }}
            />

            {series.map(entry => (
              <LineSeries key={entry.title} data={entry.data} />
            ))}

            <Highlight
              onBrushEnd={area => {
                this.setState({
                  lastDrawLocation: area
                });
              }}
            />
          </FlexibleWidthXYPlot>
        </div>

        <Button
          className="showcase-button"
          onClick={() => {
            this.setState({ lastDrawLocation: null });
          }}
        >
          Reset Zoom
        </Button>
      </div>
    );
  }
}

export default PollsGraph;
