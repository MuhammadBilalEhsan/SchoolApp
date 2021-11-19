const initialState = {
  users: [],
  curUser: {},
  course: {},
  studentCourse: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "CUR_USER":
      return { ...state, curUser: action.payload };
    case "GET_COURSE":
      return { ...state, course: action.payload };
    case "GET_Student_COURSES":
      return { ...state, studentCourse: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
