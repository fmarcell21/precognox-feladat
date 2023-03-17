import {Component, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import * as GameActions from "./State/game.actions";
import * as GameReducer from "./State/game.reducer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChild('f') startGameForm: NgForm;
  gameName: string
  gameStarted: boolean = false;
  constructor(private store: Store<GameReducer.State>) {
  }
  startGame(){
    this.gameName = this.startGameForm.value.gameName;
    this.store.dispatch(GameActions.startNewGame({payload: this.gameName}))
    this.gameStarted = !this.gameStarted;
  }
}
