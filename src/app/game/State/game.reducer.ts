import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as GameActions from "./game.actions"
export interface State{
  game: GameState
}
export interface GameState {
  board: string;
  id: number;
  name: string;
}
const initialState: GameState = {
  board: '',
  id: null,
  name: ''
}

const getGameFeatureState = createFeatureSelector<GameState>('game');
export const getBoard = createSelector(
  getGameFeatureState,
  state => state.board
);
export const getId = createSelector(
  getGameFeatureState,
  state => state.id
);
export const getName = createSelector(
  getGameFeatureState,
  state => state.name
);
export const GameReducer = createReducer<GameState>(
  initialState,
  on(GameActions.startNewGame, (state, action): GameState => {
    console.log(action.payload)
    return {
      ...state,
      board: '000000000',
      name: action.payload
    }
  }),

)
