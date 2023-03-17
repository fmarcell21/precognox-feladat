import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {HttpClientModule} from "@angular/common/http";

import * as fromApp from "./State/app.reducer"
import {AppRoutingModule} from "./app-routing";

import {GameModule} from "./game/game.module";
import {HeaderComponent} from "./header/header.component";
import { SavesComponent } from './game/saves/saves.component';
import {GameEffects} from "./game/State/game.effects";
import {FormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SavesComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        GameModule,
        StoreModule.forRoot(),
        EffectsModule.forRoot([GameEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
