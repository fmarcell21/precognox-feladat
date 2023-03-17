import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as GameActions from "./game.actions"
import {Game} from "../game.model";
export interface State{
  game: GameState
}
export interface GameState {
  currentGame: Game;
  games: Game[];
  error: string;
  newGame: boolean;
  // board: string;
  // id: number;
  // name: string;
}
const initialState: GameState = {
  currentGame: null,
  games: [],
  error: '',
  newGame: true
}

const getGameFeatureState = createFeatureSelector<GameState>('game');
export const getBoard = createSelector(
  getGameFeatureState,
  state => state.currentGame.board
);
export const getId = createSelector(
  getGameFeatureState,
  state => state.currentGame.id
);
export const getName = createSelector(
  getGameFeatureState,
  state => state.currentGame.name
);
export const getGames = createSelector(
  getGameFeatureState,
  state => state.games
)
export const getNewGame= createSelector(
  getGameFeatureState,
  state => state.newGame
)
export const GameReducer = createReducer<GameState>(
  initialState,
  on(GameActions.startNewGame, (state, action): GameState => {
    console.log(action.payload)
    return {
      ...state,
      currentGame: {
        board: '000000000',
        name: action.payload,
        id: -1,
      },
      newGame: true
    }
  }),
  on(GameActions.saveGameSuccess, (state, action): GameState => {
    return {
      ...state,
      currentGame: action.payload,
      games: [...state.games, action.payload],
      error: ''
    }
  }),
  on(GameActions.loadGamesSuccess, (state, action):GameState => {
    return {
      ...state,
      games: action.payload,
      error: ''
    }
  }),
  on(GameActions.loadGamesFail, (state, action):GameState => {
    return {
      ...state,
      error: action.payload
    }
  }),
  on(GameActions.loadGame, (state, action):GameState => {
    return {
      ...state,
      currentGame: action.payload,
      newGame: false
    }
  }),



)
