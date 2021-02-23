export const getResponseLength = (responseBody) => {
  return responseBody.reduce((acc, { value }) => acc + value.length, 0);
};

export const getTotalResponse = (responseBody) => {
  return responseBody.reduce((acc, { value }) => acc + value, '');
};
