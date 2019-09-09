import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MultipleformComponent } from './crud/multipleform/multipleform.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewComponent } from './crud/view/view.component';
import { ReadComponent } from './crud/read/read.component';
import { UpdateComponent } from './crud/update/update.component';
import { CreateComponent } from './crud/create/create.component';
import { MultibatchComponent } from './multibatch/multibatch.component';


@NgModule({
  declarations: [
    AppComponent,
    MultipleformComponent,
    ViewComponent,
    ReadComponent,
    UpdateComponent,
    CreateComponent,
    MultibatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
