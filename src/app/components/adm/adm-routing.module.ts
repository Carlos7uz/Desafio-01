import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './adm.component';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  {path: '', component: AdmComponent},
  {path: ':id', component: CrudComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
