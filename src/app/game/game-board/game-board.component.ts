import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import * as fromGame from "../State/game.reducer";
import * as gameActions from "../State/game.actions";
import {take} from "rxjs";
import {Game} from "../game.model";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit{
  @Input()newGame: boolean;
  @Input()currentPlayer: boolean;
  currentBoard: number[] = [0,0,0,0,0,0,0,0,0];
  winner: boolean = false;
  @Input()currentGame: Game;
  constructor(private store: Store<fromGame.State>) {
  }
  ngOnInit() {
    this.store.select(fromGame.getBoard).pipe(take(1)).subscribe(board => {
      // console.log(this.currentBoard[0])
      for(let i = 0; i<board.length; i++){
        this.currentBoard[i]=+board[i];
          if(this.currentBoard[i] === 1){
            document.getElementById((i).toString()).innerHTML = 'X';
          } else if(this.currentBoard[i] === 2){
            document.getElementById((i).toString()).innerHTML = 'O';
          }
      }
    })
    this.winner = null;
    // console.log(this.currentBoard)
    // console.log(this.newGame + 'From the board');

  }

  onCellClick(cell: string):void {
    this.changeCelValue(cell);
    this.store.dispatch(gameActions.updateCurrentGameBoard({payload: this.currentBoard.toString()}))
  }

  changeCelValue(cell: string){

    if (!document.getElementById(cell).innerHTML){
      if(this.currentPlayer){
       document.getElementById(cell).innerHTML = 'X';
       this.currentBoard[(+cell)] = 1

      } else {
        document.getElementById(cell).innerHTML = 'O';
        this.currentBoard[(+cell)] = 2
      }
      this.store.dispatch(gameActions.toggleCurrentPlayer());
    }
    // console.log(this.currentBoard)
    this.calculateWinner();

  }

//TODO somehow make this work
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i];

      if(
        (this.currentBoard[a]) && (this.currentBoard[a] === this.currentBoard[b]) && (this.currentPlayer[a] === this.currentBoard[c])
      ) {
        console.log('winner')
        return this.currentBoard[a]
      }
    }

    return null;
  }
}
