import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Screen1Component } from './screen-1/screen-1.component';
import { Screen2Component } from './screen-2/screen-2.component';

const routes: Routes = [
  { path: 'screen1', component: Screen1Component },
  { path: 'screen2', component: Screen2Component },
  { path: '', redirectTo: '/screen1', pathMatch: 'full' },
  { path: '**', redirectTo: '/screen1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
