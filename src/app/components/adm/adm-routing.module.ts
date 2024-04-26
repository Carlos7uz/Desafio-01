import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './adm.component';
import { CrudComponent } from './crud/crud.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { AdminGuard } from 'src/app/auth/guards/admin.guard';

const routes: Routes = [
  {path: '', component: AdmComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: ':id', component: CrudComponent, canActivate: [AuthGuard, AdminGuard]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
