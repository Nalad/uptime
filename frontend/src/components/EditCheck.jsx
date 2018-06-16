// @flow

import React from "react";
import type { EditWindow } from "../containers/ChecksContainer";

type Props = {
  isEditing: boolean,
  editWindow: EditWindow,
  handleEditWindow: Function,
  handleInputChange: Function,
  handleFillEditWindow: Function,
  sendCheck: Function
};

// class EditCheck extends React.Component<Props> {
const EditCheck = (props: Props) => (
  // render() {
  <div>
    {props.isEditing ? (
      <div>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={props.editWindow.name}
            onChange={event => props.handleInputChange(event)}
          />
          <input
            type="text"
            placeholder="Uri"
            name="uri"
            value={props.editWindow.uri}
            onChange={event => props.handleInputChange(event)}
          />
          <input
            type="number"
            placeholder="Polling interval"
            name="interval"
            value={props.editWindow.interval}
            onChange={event => props.handleInputChange(event)}
          />
        </div>
        <div>
          <button onClick={() => props.sendCheck(props.editWindow)}>
            Save
          </button>
          <button onClick={() => props.handleEditWindow(false)}>Cancel</button>
        </div>
      </div>
    ) : (
      <div>
        <button
          onClick={() => {
            props.handleEditWindow(true);
            props.handleFillEditWindow({ name: "", uri: "", interval: 30000 });
          }}
        >
          Add
        </button>
      </div>
    )}
  </div>
);

export default EditCheck;
