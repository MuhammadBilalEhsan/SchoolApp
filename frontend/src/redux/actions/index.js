export const getUsers = data => {
  return {
    type: "GET_USERS",
    payload: data,
  };
};
export const curUser = data => {
  return {
    type: "CUR_USER",
    payload: data,
  };
};
