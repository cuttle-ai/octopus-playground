import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'pages', loadChildren: 'src/app/pages/pages.module#PagesModule', pathMatch: 'prefix' },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '*', redirectTo: 'pages', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
