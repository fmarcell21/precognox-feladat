import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GameComponent} from "./game.component";



const appRoutes: Routes = [
  {path: '', component: GameComponent, children: [

    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class GameRoutingModule {}
