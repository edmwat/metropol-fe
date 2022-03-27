import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { AccountsComponent } from './accounts/accounts.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    AccountsComponent,
    CardComponent
  ], 
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorInterceptor , 
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
