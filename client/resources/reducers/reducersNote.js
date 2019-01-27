export default (state={notes: []}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        notes: action.data.notes,
      };
    case 'ADD_NOTE':
      return {
        ...state,
        notes: ([action.data.note]).concat(state.notes),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.id),
      };
    case 'SET_EDIT':
      return {
        ...state,
        noteToEdit: action.note,
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) => {
          if(note._id === action.data.note._id) {
            return {
              ...action.data.note,
            }
          }
          return note;
        }),
        noteToEdit: undefined,
      }
    default:
      return state;
  }
};
