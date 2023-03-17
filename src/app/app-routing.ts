import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {SavesComponent} from "./game/saves/saves.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/game', pathMatch: 'full'},
  {path: 'game', loadChildren: () => import("./game/game.module").then(m => m.GameModule)},

  {path: 'saves', component: SavesComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
