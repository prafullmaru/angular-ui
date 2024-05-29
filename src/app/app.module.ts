import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'ids-enterprise-wc/enterprise-wc.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { Screen1Component } from './components/screen-1/screen-1.component';
import { Screen2Component } from './components/screen-2/screen-2.component';
@NgModule({
  declarations: [
    AppComponent,
    Screen1Component,
    AppMenuComponent,
    Screen2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
