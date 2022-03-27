import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthErrorResponse } from '../models/auth-error-response';
import { AuthenticationResponse } from '../models/auth-response';
import { LoginRequest } from '../models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  authenticate(cred:LoginRequest){  
     const myheader = new HttpHeaders();
     myheader.set('Content-Type', 'application/json')

   this.http.post<AuthenticationResponse>(this.baseUrl+"/authenticate", cred,{headers:myheader})
     .subscribe((data:AuthenticationResponse) => {  
         window.localStorage.removeItem("access_token");  
         window.localStorage.setItem("access_token",data.jwt); 
         //this.router.navigate(['/user']);
       
     },error=>{
       console.log("Error from server: "+error.message)
     });
   }
   isLoggedin(){

   }
   getLoggedinUser():Observable<AuthErrorResponse>{
    return this.http.get<AuthErrorResponse>(this.baseUrl+"/authenticatedPrincipal",{responseType:'json'})
   }
}
