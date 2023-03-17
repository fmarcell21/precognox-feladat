import {Component, Input, ViewChild} from "@angular/core";
import {Game} from "../../game.model";
import {Store} from "@ngrx/store";

import * as fromGame from "../../State/game.reducer";
import * as gameActions from "../../State/game.actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-saves-list',
  templateUrl: 'saves-list.component.html'
})
export class SavesListComponent{
  @Input() errorMessage: string;
  @Input() games: Game[];

  constructor(private store: Store<fromGame.State>, private router: Router) {
  }
  modalOpen = false;
  selectedItem: Game;


  toggleModal(){
    if(this.modalOpen){
      this.selectedItem = null;
    }
    this.modalOpen = !this.modalOpen;

  }
  gameSelected(i: number){
    // console.log(i);
    this.toggleModal();

    // this.selectedItem = i;
    this.selectedItem = this.games.find((obj)=>{return obj.id === i});

  }
  loadGame(){
    // console.log('loadGame: '+ this.games[this.selectedItem].name);
    // this.store.dispatch(gameActions.loadGame({payload: this.games[this.selectedItem]}));
    this.store.dispatch(gameActions.loadGame({payload: this.selectedItem}));
    this.router.navigate(['game/'])
    this.toggleModal();
  }
  deleteGame(){
    // console.log('deleteGame: '+ this.games[this.selectedItem].name)
    console.log(this.selectedItem)
    this.store.dispatch(gameActions.deleteGame({payload: this.selectedItem.id}))
    this.toggleModal()
  }

}
