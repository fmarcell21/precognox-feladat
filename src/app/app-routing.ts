import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GameComponent} from "./game/game.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/game', pathMatch: 'full'},
  {path: 'game', component: GameComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
