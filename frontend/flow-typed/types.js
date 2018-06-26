// @flow

export type Credentials = {
  username: string,
  password: string
};

export type Poll = {
  availability: "UP" | "DOWN",
  latency: number,
  time: Date
};

export type Check = {
  name: string,
  uri: string,
  interval: number,
  polls: Array<Poll>
};

declare type ActionType =
  | "LOGIN_REQUEST"
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILURE"
  | "LOGOUT_REQUEST"
  | "LOGOUT_SUCCESS"
  | "LOGOUT_FAILURE"
  | "SIGN_UP_REQUEST"
  | "SIGN_UP_SUCCESS"
  | "SIGN_UP_FAILURE"
  | "CHECKS_SUCCESS"
  | "CLEAN_CHECKS"
  | "CHECK_ADD_REQUEST"
  | "CHECK_ADD_SUCCESS"
  | "CHECK_ADD_FAILURE";

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

export type Action =
  | ActionT<"LOGIN_REQUEST", Credentials>
  | ActionT<"LOGIN_SUCCESS", *>
  | ActionT<"LOGIN_FAILURE", string>
  | ActionT<"LOGOUT_REQUEST", *>
  | ActionT<"LOGOUT_SUCCESS", *>
  | ActionT<"LOGOUT_FAILURE", *>
  | ActionT<"SIGN_UP_REQUEST", *>
  | ActionT<"SIGN_UP_SUCCESS", *>
  | ActionT<"SIGN_UP_FAILURE", string>
  | ActionT<"CHECKS_SUCCESS", Array<Check>>
  | ActionT<"CLEAN_CHECKS", *>
  | ActionT<"CHECK_ADD_REQUEST", *>
  | ActionT<"CHECK_ADD_SUCCESS", *>
  | ActionT<"CHECK_ADD_FAILURE", string>;
