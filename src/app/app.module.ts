
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { FormsComponent } from './components/forms/forms.component';
import { SearchComponent } from './components/search/search.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { RestauranteDetailComponent } from './components/restaurante-detail/restaurante-detail.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormsComponent,
    SearchComponent,
    RestaurantesComponent,
    RestauranteDetailComponent,
    LoginComponent,
    DashboardComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
