import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit{
  @Input()newGame: boolean;
  constructor() {
  }
  ngOnInit() {
    console.log(this.newGame + 'From the board')
  }

  onCellClick(cell: string):void {
    this.changeCelValue(cell);
  }

  changeCelValue(cell: string){
    if (!document.getElementById(cell).innerHTML){
      // console.log(cell);
      document.getElementById(cell).innerHTML = 'x';
    }
  }
}
