import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthErrorResponse } from '../models/auth-error-response';
import { LoggedInUser } from '../models/logged-in-user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedin:string="";
  constructor(
    private authService:AuthenticationService, 
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       this.authService.getLoggedinUser().subscribe((res:LoggedInUser)=>{
        this.isLoggedin = res.username
      });
      return this.isLoggedin.length >0 ? true : this.router.parseUrl('/login');
  }
  
}
