import {NgModule} from "@angular/core";
import {GameComponent} from "./game.component";
import { GameBoardComponent } from './game-board/game-board.component';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import {GameReducer} from "./State/game.reducer";

@NgModule({
  declarations: [GameComponent, GameBoardComponent],
  imports: [
    NgIf,
    FormsModule,
    StoreModule.forFeature('game', GameReducer),

  ],

})
export class GameModule {}
