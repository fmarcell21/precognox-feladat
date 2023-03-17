import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import * as gameActions from "./game.actions"
import {catchError, concatMap, map, mergeMap, of} from "rxjs";
import {GameService} from "../game.service";
@Injectable()
export class GameEffects{
  constructor(private actions$: Actions, private gameService: GameService) {
  }

  loadGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(gameActions.loadGames),
      mergeMap(() => this.gameService.getGames().pipe(
        map(games => gameActions.loadGamesSuccess({payload: games})),
        catchError(error => of(gameActions.loadGamesFail({payload: error})))
      ))
    )
  });

  deleteGame$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(gameActions.deleteGame),
      mergeMap(action =>
      this.gameService.deleteGame(action.payload).pipe(
        map(()=> gameActions.deleteGameSuccess({payload: action.payload})),
        catchError(err => of(gameActions.deleteGameFail({payload: err})))
      ))
    )
  })

  saveGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(gameActions.saveGame),
      concatMap(action => this.gameService.saveGame(action.payload)
        .pipe(
          map(game => gameActions.saveGameSuccess({payload: game})),
          catchError(error => of(gameActions.saveGameFail({payload: error})))
        ))
    )
  })

}
