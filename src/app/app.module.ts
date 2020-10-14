import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';

import { FormsModule} from "@angular/forms";
import { DatabaseService } from './database.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
