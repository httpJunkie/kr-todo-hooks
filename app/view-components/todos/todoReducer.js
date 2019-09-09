export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return null // 06
    }
    case 'TOGGLE_COMPLETE': {
      return null // 07
    }
    case 'DELETE_TODO': {
      return null // 08
    }
    case 'CLEAR_TODOS': {
      return null // 09
    }
    default: {
      return state;
    };
  }
}