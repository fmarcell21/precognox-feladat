import {NgModule} from "@angular/core";
import {GameComponent} from "./game.component";
import { GameBoardComponent } from './game-board/game-board.component';

import {FormsModule} from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import {GameReducer} from "./State/game.reducer";
import {SavesListComponent} from "./saves/saves-list/saves-list.component";
import {CommonModule} from "@angular/common";
import {GameRoutingModule} from "./game-routing.module";

@NgModule({
  declarations: [GameComponent, GameBoardComponent, SavesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('game', GameReducer),
    GameRoutingModule,
  ],

  exports: [
    SavesListComponent
  ]
})
export class GameModule {}
