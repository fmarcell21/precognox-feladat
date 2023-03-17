import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import * as gameActions from "./game.actions"
import {catchError, map, mergeMap, of} from "rxjs";
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
  })
}
