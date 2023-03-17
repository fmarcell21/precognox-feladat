import { ActionReducerMap } from '@ngrx/store';
import * as fromGame from "../game/State/game.reducer"

export interface AppState {
  game: fromGame.State,
}

// export const appReducer: ActionReducerMap<AppState> = {
//   game: fromGame.GameReducer
// };
