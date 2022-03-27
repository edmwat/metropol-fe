import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthErrorResponse } from '../models/auth-error-response';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedin:boolean=false;
  constructor(
    private authService:AuthenticationService, 
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       this.authService.getLoggedinUser().subscribe((res:AuthErrorResponse)=>{
        if(res.errorCode == 401){
          this.isLoggedin= false;
          //this.router.parseUrl('/login')
        }else{
          this.isLoggedin = true;
        }
      });
      return this.isLoggedin ? true : this.router.parseUrl('/login');
  }
  
}
