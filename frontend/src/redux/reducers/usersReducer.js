const initialState = {
  users: [],
  curUser: {},
  course: {},
  studentCourse: [],
  currentCourse: null,
  allAssignments: null
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
    case "UPDATE_COURSES":
      var findCourse = state.studentCourse.find(course => course._id === action.payload._id)
      if (findCourse) {
        findCourse = action.payload
        const filterOther = state.studentCourse.filter(course => course._id !== action.payload._id)
        const newArr = [...filterOther, findCourse]
        return { ...state, studentCourse: newArr };
      } else {
        return state
      }
    case "CURRENT_COURSE":
      return { ...state, currentCourse: action.payload }
    case "UPDATE_CURRENT_COURSE":
      if (state.currentCourse && state.currentCourse._id === action.payload._id) {
        return { ...state, currentCourse: action.payload }
      } else {
        return state
      }
    case "ALL_ASSIGNMENTS":
      return { ...state, allAssignments: action.payload };

    case "UPDATE_ALL_ASSIGNMENTS":
      if (state.allAssignments && state.allAssignments[0].courseID === action.payload[0].courseID) {
        return { ...state, allAssignments: action.payload }
      } else {
        return state
      }
    case "LOG_OUT":
      return state = initialState;
    default:
      return state;
  }
};

export default usersReducer;
