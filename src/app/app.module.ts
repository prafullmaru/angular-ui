import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'ids-enterprise-wc/enterprise-wc.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { CustomerNewComponent } from './components/customer-new/customer-new.component';
import { CustomerInquiryComponent } from './components/customer-inquiry/customer-inquiry.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerNewComponent,
    AppMenuComponent,
    CustomerInquiryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
