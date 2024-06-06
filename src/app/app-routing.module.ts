import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInquiryComponent } from './components/customer-inquiry/customer-inquiry.component';
import { CustomerNewComponent } from './components/customer-new/customer-new.component';

const routes: Routes = [
  { 
    path: 'customer-new', component: CustomerNewComponent,
  },

  { 
    path: 'customer-inquiry', component: CustomerInquiryComponent,
  },
  // { path: '', redirectTo: '/screen1', pathMatch: 'full' },
  // { path: '**', redirectTo: '/screen1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
