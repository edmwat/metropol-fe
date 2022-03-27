import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AuthGuardChild } from './services/child-guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'dashboard',canActivate:[AuthGuard],canActivateChild:[AuthGuardChild], children:[
    {path:'account', component:AccountsComponent},
    {path:'card',component:CardComponent}
  ], component:DashboardComponent},
  {path:'home', component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**', redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
