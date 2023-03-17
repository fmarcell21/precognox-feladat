import {createAction, props} from "@ngrx/store";
import {Game} from "../game.model";

export const startNewGame = createAction(
  '[Game] New Game',
  props<{payload: string}>()
);
export const resetCurrentGame = createAction(
  '[Game] Reset Current Game'
)
/*Saving the current game*/
export const saveGame = createAction(
  '[Game] Save Game',
  props<{payload: Game}>()
)
export const saveGameSuccess = createAction(
  '[Game] Save Game Success',
  props<{payload: Game}>()
)
export const saveGameFail = createAction(
  '[Game] Save Game Fail',
  props<{payload: string}>()
)
/*Load the games*/
export const loadGames = createAction(
  '[Saves] Load Games',
)
export const loadGamesSuccess = createAction(
  '[Saves] Load Games Success',
  props<{payload: Game[]}>()
)
export const loadGamesFail = createAction(
  '[Saves] Load Games Fail',
  props<{payload: string}>()
)
/*Load a game*/
export const loadGame = createAction(
  '[Saves] Load Game',
  props<{payload: Game}>()
)
/*Toggle The current Player*/
export const toggleCurrentPlayer = createAction(
  '[Game] Toggle Current Player'
)
/*Update the current game*/
export const updateCurrentGameBoard = createAction(
  '[Game] Update current game board',
  props<{payload: string}>()
)
export const updateCurrentGameName = createAction(
  '[Game] Update current game name',
  props<{payload: string}>()
)
/*Delete*/
export const deleteGame = createAction(
  '[Save] deleteGame',
  props<{payload: number}>()
)
export const deleteGameSuccess = createAction(
  '[Save] Delete Game success',
  props<{payload: number}>()
)
export const deleteGameFail = createAction(
  '[Save] Delete Game failure',
  props<{payload: string}>()
)

