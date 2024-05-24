import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'ids-enterprise-wc/enterprise-wc.js';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Screen1Component } from './screen-1/screen-1.component';
@NgModule({
  declarations: [
    AppComponent,
    Screen1Component,
    AppMenuComponent,
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
