import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AdmComponent } from './components/adm/adm.component';

const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then
    ((module) => module.DashboardModule)
  },
  {path: 'forms', component: FormsComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'adm', component: AdmComponent},
  {
    path: 'restaurantes',
    loadChildren: () => import('./components/restaurantes/restaurantes.module').then
    ((module) => module.RestaurantesModule)
  },
  {
    path: 'adm',
    loadChildren: () => import('./components/adm/adm.module').then
    ((module) => module.AdmModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
