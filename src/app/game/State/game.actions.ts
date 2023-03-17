import {createAction, props} from "@ngrx/store";
import {Game} from "../game.model";

export const startNewGame = createAction(
  '[Game] New Game',
  props<{payload: string}>()
);
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

