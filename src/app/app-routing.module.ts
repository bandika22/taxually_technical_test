import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './features/home/pages/file-manager/file-manager.component';
import { AuthGuard } from './core/guards/auth.gurd';

const routes: Routes = [
  { path: '', component: FileManagerComponent, canActivate: [AuthGuard]},
  { path: 'home', component: FileManagerComponent, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
