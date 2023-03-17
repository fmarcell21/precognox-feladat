import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  winner: string;
  steps: number = 0;
  @Input()currentGame: Game;
  @Output()gameWon = new EventEmitter<string>;
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

    if(this.winner){
      // window.alert(this.currentPlayer? 'X' : 'O' + 'Won the Game')
      // console.log(this.winner + ' Won')
      this.gameWon.emit(this.winner);
    }
  }

  changeCelValue(cell: string){
  if(this.winner === null){
    this.steps = this.steps + 1;
    console.log(this.steps)
    if (!document.getElementById(cell).innerHTML){
      if(this.currentPlayer){
        document.getElementById(cell).innerHTML = 'X';
        this.currentBoard[(+cell)] = 1

      } else {
        document.getElementById(cell).innerHTML = 'O';
        this.currentBoard[(+cell)] = 2
      }

      this.store.dispatch(gameActions.updateCurrentGameBoard({payload: this.currentBoard.toString()}))
    }
    // console.log(this.currentBoard)
    this.winner =this.calculateWinner();
    this.store.dispatch(gameActions.toggleCurrentPlayer());
    if(this.steps >=9){
      this.winner = "draw";
      this.gameWon.emit(this.winner)
    }
  }



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
      // if(
      //   (this.currentBoard[a]>0) && (this.currentBoard[a] === this.currentBoard[b]) && (this.currentPlayer[a] === this.currentBoard[c])
      // ) {
      //   console.log('winner')
      //   // return this.currentBoard[a]
      // }

      if(this.currentBoard[a]===this.currentBoard[c] && this.currentBoard[a]===this.currentBoard[b] && this.currentBoard[a]>0){
        console.log('Winner')
        const whoWon = this.currentPlayer? 'X' : 'O'
        return whoWon;
      }
    }

    return null;
  }
}
