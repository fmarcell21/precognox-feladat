import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import * as GameActions from "./State/game.actions";
import * as GameReducer from "./State/game.reducer";
import {NgForm} from "@angular/forms";
import {take} from "rxjs";
import * as fromGame from "./State/game.reducer";
import {Game} from "./game.model";


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
  currentPlayer: boolean;
  currentGame : Game;
  constructor(private store: Store<GameReducer.State>) {
  }

  ngOnInit() {
    this.store.select(GameReducer.getNewGame).pipe(take(1)).subscribe((newGame) => {
      this.newGame = newGame;
    });
    if(!this.newGame){
      this.gameStarted = true;
      console.log(this.gameName)
    }
    this.store.select(fromGame.getCurrentPlayer).subscribe(current => {
      this.currentPlayer = current
    })

   }
  startGame(){
    this.gameStarted = !this.gameStarted;
    this.store.dispatch(GameActions.startNewGame({payload: this.gameName}))
  }

  saveGame(){
    this.gameName = this.startGameForm.value.gameName;
    this.store.dispatch(GameActions.updateCurrentGameName({payload: this.gameName}));
    this.store.select(GameReducer.getCurrentGame).pipe(take(1)).subscribe(currentGame => {

      this.currentGame = currentGame;

    });
    this.store.dispatch(GameActions.saveGame({payload: this.currentGame}));
    // console.log(this.currentGame)
    this.gameStarted = !this.gameStarted;
  }
}
