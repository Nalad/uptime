// @flow

export const getAuthorizationHeader = () => {
  const jwtToken = localStorage.getItem("jwt_token");

  let headers = {};
  if (jwtToken)
    headers = Object.assign({}, headers, {
      Authorization: `Bearer ${jwtToken}`
    });

  return headers;
};

export const getMean = (data: Array<number>) =>
  data.reduce((sum, value) => sum + value) / data.length;

export const getVariance = (data: Array<number>) => {
  const mean = getMean(data);
  return data.reduce((sum, value) => sum + (value - mean) ** 2) / data.length;
};
