import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  getUserAccount():Observable<Account[]>{
    return this.http.get<Account[]>(this.baseUrl+"/accounts/all",{responseType:'json'});
  }
  addNewAccount(account:Account){
    const myheader = new HttpHeaders();
     myheader.set('Content-Type', 'application/json')

   this.http.post(this.baseUrl+"/accounts/add", account,{headers:myheader}).subscribe();
  }
  
  deleteAccount(accountId:any){
    this.http.delete(this.baseUrl+"/accounts/"+accountId).subscribe();
  }
}
