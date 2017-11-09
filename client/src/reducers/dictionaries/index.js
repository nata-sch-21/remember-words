// import constants

const initialState = {
  some: false,
};

export default function someReducer(state, action) {
  switch (action.type) {
    case 'SOME_ACTION':
      return { ...state, some: !state.some };
    default:
      return state;
  }
}