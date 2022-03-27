import { HttpClient, HttpHeaders } from '@angular/common/http';
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

   this.http.post<AuthenticationResponse>(this.baseUrl+"/authenticate", cred,{headers:myheader})
     .subscribe((data:AuthenticationResponse) => {  
       console.log("after login: "+data.jwt)
         window.localStorage.removeItem("access_token");  
         window.localStorage.setItem("access_token",data.jwt); 
         console.log("before redirect!!!!!!!!!!!!")
         this.router.navigate(['/dashboard']);
       
     },error=>{
       console.log("Error from server: "+error.message)
     });
   }
   isLoggedin(){

   }
   getLoggedinUser():Observable<LoggedInUser>{
     return this.http.get<LoggedInUser>(this.baseUrl+"/authenticatedPrincipal",{responseType:'json'});
   }
}
