import { AppGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'entries', loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule), canActivate: [ AppGuard ] },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule), canActivate: [ AppGuard ] },
  { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule), canActivate: [ AppGuard ] },
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },

  { path: '', redirectTo: '/reports', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
