import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthErrorResponse } from '../models/auth-error-response';
import { AuthenticationResponse } from '../models/auth-response';
import { LoggedInUser } from '../models/logged-in-user';
import { LoginRequest } from '../models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl:string="http://localhost:8080"

  constructor(private http:HttpClient, private router:Router) { }

  authenticate(cred:LoginRequest){  
     const myheader = new HttpHeaders();
     myheader.set('Content-Type', 'application/json')

    return this.http.post<any>(this.baseUrl+"/authenticate", cred,{headers:myheader})
     
   }
   isLoggedin(){

   }
   getLoggedinUser():Observable<any>{
     return this.http.get<any>(this.baseUrl+"/authenticatedPrincipal",{responseType:'json'});
   }
}
