import {UIState, UiActionTypes, SEARCH_SUBMIT} from '../types';

const initialState: UIState = {
  mainUI: {
    query: [],
  },
};

export default function (state = initialState, action: UiActionTypes): UIState {
  switch (action.type) {
    case SEARCH_SUBMIT:
      return {
        ...state,
        mainUI: {...state.mainUI, query: action.payload.query},
      };
    default:
      return state;
  }
}
