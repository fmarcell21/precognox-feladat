import {Component, OnInit, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {Game} from "../game.model";
import {Store} from "@ngrx/store";

import * as gameActions from '../State/game.actions';
import * as fromGames from '../State/game.reducer';
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.css']
})
export class SavesComponent implements OnInit{
  games$: Observable<Game[]>;
  gameName: string;
  selectedGame$: Observable<Game>;
  errorMessage$: Observable<string>;
  @ViewChild('form') startGameForm: NgForm;

  constructor(private store: Store<fromGames.State>) {
  }
  ngOnInit() {
    this.store.dispatch(gameActions.loadGames());
    this.games$ = this.store.select(fromGames.getGames);
  }
  searchGames(form: NgForm){
    console.log(form.value)
    this.games$ = this.store.select(fromGames.getGames).pipe(
      map( results => results.filter(r => r.name.includes(form.value.gameName)))
    );
  }
}
