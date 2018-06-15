// @flow

import React from "react";
import type { EditWindow } from "../containers/ChecksContainer";

type Props = {
  isEditing: boolean,
  editWindow: EditWindow,
  handleEditWindow: Function,
  handleInputChange: Function,
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
          <button>Delete</button>
        </div>
      </div>
    ) : (
      <div>
        <button onClick={() => props.handleEditWindow(true)}>Add</button>
      </div>
    )}
  </div>
);

export default EditCheck;
