import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card } from "../models/card";

@Injectable({
    providedIn: 'root'
  })

  export class CardService {
    baseUrl:string="http://localhost:8080"

    constructor(private http:HttpClient) { }

    getAccountCards():Observable<Card[]>{
        return this.http.get<Card[]>(this.baseUrl+"/accounts/all",{responseType:'json'});
      }
      addNewCard(account:Card){
        const myheader = new HttpHeaders();
         myheader.set('Content-Type', 'application/json')
    
       this.http.post(this.baseUrl+"/accounts/add", account,{headers:myheader}).subscribe();
      }
      
      deleteCard(accountId:any){
        this.http.delete(this.baseUrl+"/accounts/"+accountId).subscribe();
      }

  }