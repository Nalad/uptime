// @flow

const getAuthorizationHeader = () => {
  const jwtToken = localStorage.getItem("jwt_token");

  let headers = {};
  if (jwtToken)
    headers = Object.assign({}, headers, {
      Authorization: `Bearer ${jwtToken}`
    });

  return headers;
};

// eslint-disable-next-line import/prefer-default-export
export { getAuthorizationHeader };
