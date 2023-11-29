import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromptComponent } from './prompt/prompt.component';
import { ToggleClassDirective } from './app.component';
import { HomeComponent } from './home/home.component'; // Import your directive


@NgModule({
  declarations: [
    AppComponent,
    PromptComponent,
    ToggleClassDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
