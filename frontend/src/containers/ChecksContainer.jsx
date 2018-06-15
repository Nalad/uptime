// @flow

import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getChecks } from "../asyncActions";
import EditCheck from "../components/EditCheck";
import CheckInfo from "../components/CheckInfo";
import { getAuthorizationHeader } from "../Utilities";

const postCheck = (check: Check) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthorizationHeader()
  };

  axios({
    method: "POST",
    url: "http://localhost:8080/api/checks",
    data: check,
    headers
  });
};

type Props = {
  getData: Function,
  checks: Array<Check>
};

export type EditWindow = {
  name: string,
  uri: string,
  interval: number
};

type State = {
  isEditing: boolean,
  editWindow: EditWindow
};

class ChecksContainer extends React.Component<Props, State> {
  state = {
    isEditing: false,
    editWindow: { name: "", uri: "", interval: 5000 }
  };

  componentDidMount() {
    this.props.getData();
  }

  handleEditWindow = (visible: boolean) => {
    this.setState(Object.assign({}, this.state, { isEditing: visible }));
  };

  handleInputChange = (
    event: SyntheticEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement
    }
  ) => {
    const ew = Object.assign({}, this.state.editWindow, {
      [event.currentTarget.name]: event.currentTarget.value
    });
    this.setState({ editWindow: ew });
  };

  handleFillEditWindow = (data: EditWindow) => {
    this.setState({ editWindow: data });
  };

  render() {
    return (
      <div>
        {this.props.checks.map(check => (
          <CheckInfo
            {...check}
            handleFillEditWindow={this.handleFillEditWindow}
            key={check.name}
          />
        ))}
        <EditCheck
          isEditing={this.state.isEditing}
          editWindow={this.state.editWindow}
          handleEditWindow={this.handleEditWindow}
          handleInputChange={this.handleInputChange}
          sendCheck={postCheck}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { chks } = state;
  const { checks } = chks;

  return {
    checks
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData() {
    dispatch(getChecks());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecksContainer);
