import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'ids-enterprise-wc/enterprise-wc.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerInquiryComponent } from './components/customer-inquiry/customer-inquiry.component';
import { CustomerNewComponent } from './components/customer-new/customer-new.component';
import { LoadCsvToTableComponent } from './components/load-csv-to-table/load-csv-to-table.component';
import { LoadToCSIComponent } from './components/load-to-csi/load-to-csi.component';
@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    CustomerNewComponent,
    CustomerInquiryComponent,
    LoadToCSIComponent,
    LoadCsvToTableComponent,
    CustomerEditComponent,
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
