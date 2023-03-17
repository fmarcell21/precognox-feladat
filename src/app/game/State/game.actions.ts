import {createAction, props} from "@ngrx/store";
import {Game} from "../game.model";

export const startNewGame = createAction(
  '[Game] New Game',
  props<{payload: string}>()
);

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
