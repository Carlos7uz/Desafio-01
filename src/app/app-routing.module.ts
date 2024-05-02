import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './components/reservas/reservas.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'cadastro', component: CadastroComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then
    ((module) => module.DashboardModule)
  },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {
    path: 'restaurantes',
    loadChildren: () => import('./components/restaurantes/restaurantes.module').then
    ((module) => module.RestaurantesModule)
  },
  {path: 'forms', component: FormsComponent, canActivate: [AuthGuard]},
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
