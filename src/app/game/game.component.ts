import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import * as GameActions from "./State/game.actions";
import * as GameReducer from "./State/game.reducer";
import {NgForm} from "@angular/forms";
import {take} from "rxjs";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  @ViewChild('f') startGameForm: NgForm;
  gameName: string
  gameStarted: boolean;
  newGame: boolean = false;

  constructor(private store: Store<GameReducer.State>) {
  }

  ngOnInit() {
    this.store.select(GameReducer.getNewGame).pipe(take(1)).subscribe((newGame) => {
      this.newGame = newGame;
    });
    if(!this.newGame){
      this.gameStarted = true;
    }
   }
  startGame(){
    this.gameStarted = !this.gameStarted;
  }
  saveGame(){
    this.gameName = this.startGameForm.value.gameName;
    this.store.dispatch(GameActions.startNewGame({payload: this.gameName}))
    this.gameStarted = !this.gameStarted;
  }
}
