import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SessionListComponent} from './components/session-list/session-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SessionListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
