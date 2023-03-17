import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../game.model";
import {Store} from "@ngrx/store";

import * as gameActions from '../State/game.actions';
import * as fromGames from '../State/game.reducer';
@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.css']
})
export class SavesComponent implements OnInit{
  games$: Observable<Game[]>;
  selectedGame$: Observable<Game>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromGames.State>) {
  }
  ngOnInit() {
    this.store.dispatch(gameActions.loadGames());
    this.games$ = this.store.select(fromGames.getGames)
  }
}
