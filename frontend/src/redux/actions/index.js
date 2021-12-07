export const getUsers = data => {
  return {
    type: "GET_USERS",
    payload: data,
  };
};
export const curUserFun = data => {
  return {
    type: "CUR_USER",
    payload: data,
  };
};
export const getCourseFunc = data => {
  return {
    type: "GET_COURSE",
    payload: data,
  };
};
export const getStudentCourseFunc = data => {
  return {
    type: "GET_Student_COURSES",
    payload: data,
  };
};
export const logoutFunc = () => {
  return {
    type: "LOG_OUT"
  }
}
