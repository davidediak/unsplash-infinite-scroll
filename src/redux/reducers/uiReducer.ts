import {UIState, UiActionTypes, SEARCH_SUBMIT, DO_RESET} from '../types';

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

    case DO_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
