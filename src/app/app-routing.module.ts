import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Screen1Component } from './components/screen-1/screen-1.component';
import { Screen2Component } from './components/screen-2/screen-2.component';

const routes: Routes = [
  { path: 'screen1', component: Screen1Component,
  data: { icons: ['save', 'cancel','rejected-outline','bolt', 'filter'] }
   },
  { path: 'screen2', component: Screen2Component,
  data: { icons: ['search','edit','add','copy'] }
   },
  // { path: '', redirectTo: '/screen1', pathMatch: 'full' },
  // { path: '**', redirectTo: '/screen1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
