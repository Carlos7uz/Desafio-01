import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsComponent } from './components/forms/forms.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { SearchComponent } from './components/search/search.component';
import { AdmFunctionsComponent } from './components/adm-functions/adm-functions.component';




@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    LoginComponent,
    HeaderComponent,
    CadastroComponent,
    AdmFunctionsComponent,



  ],
  imports: [
    // @angular
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // feature


    // app
    CoreModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
