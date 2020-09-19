export interface ReducersStates {
  UI: UIState;
}

export interface MainUIState {
  query: string[];
}
export interface UIState {
  mainUI: MainUIState;
}
export const SEARCH_SUBMIT = 'SEARCH_SUBMIT';

interface SearchSubmitActions {
  type: typeof SEARCH_SUBMIT;
  payload: MainUIState;
}

export type UiActionTypes = SearchSubmitActions;
