import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerInquiryComponent } from './components/customer-inquiry/customer-inquiry.component';
import { CustomerNewComponent } from './components/customer-new/customer-new.component';
import { LoadCsvToTableComponent } from './components/load-csv-to-table/load-csv-to-table.component';
import { LoadToCSIComponent } from './components/load-to-csi/load-to-csi.component';
import { CustomerSiteXRefNewComponent } from './components/customer-site-x-ref-new/customer-site-x-ref-new.component';

const routes: Routes = [
  { 
    path: 'customer-new', component: CustomerNewComponent,
  },

  { 
    path: 'customer-inquiry', component: CustomerInquiryComponent,
  },

  {
    path: 'customer-edit', component: CustomerEditComponent
  },

  {
    path: 'load-to-csi', component: LoadToCSIComponent
  },
  
  {
    path:'load-csv-to-table', component:LoadCsvToTableComponent
  }, 
  {
    path: 'customer-site-reference-x-ref-new', component: CustomerSiteXRefNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
