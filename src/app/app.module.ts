
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FormsComponent } from './components/forms/forms.component';
import { SearchComponent } from './components/search/search.component';
import { RestaurantesComponent } from './components/restaurantes/all_restaurants/restaurantes.component';
import { RestauranteDetailComponent } from './components/restaurantes/restaurante-detail/restaurante-detail.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CoreModule } from './core/core.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { RestaurantesModule } from './components/restaurantes/restaurantes.module';


@NgModule({
  declarations: [
    AppComponent,

    FormsComponent,
    LoginComponent,
    HeaderComponent,

  ],
  imports: [
    // @angular
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    // feature
    DashboardModule,
    RestaurantesModule,

    // app
    CoreModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
