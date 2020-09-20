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
export const DO_RESET = 'DO_RESET';
interface SearchSubmitActions {
  type: typeof SEARCH_SUBMIT;
  payload: MainUIState;
}

interface DoResetActions {
  type: typeof DO_RESET;
}

export type UiActionTypes = SearchSubmitActions | DoResetActions;
