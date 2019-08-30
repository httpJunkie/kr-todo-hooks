export const todoReducer = (state, action) => {
switch (action.type) {
    case 'ADD_TODO': {
      return null // 04
    }
    case 'TOGGLE_COMPLETE': {
      return  null // 05
    }
    case 'DELETE_TODO': {
      return  null // 06
    }
    case 'CLEAR_TODOS': {
      return  null // 07
    }
    default: {
      return state;
    };
  }
}