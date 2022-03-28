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

    getAccountCards(accId:any):Observable<Card[]>{
        return this.http.get<Card[]>(this.baseUrl+"/cards/"+accId,{responseType:'json'});
    }
    addNewCard(account:Card){
      const myheader = new HttpHeaders();
       myheader.set('Content-Type', 'application/json')
  
     this.http.post(this.baseUrl+"/cards/add", account,{headers:myheader}).subscribe();
    }
    
    deleteCard(accountId:any){
      this.http.delete(this.baseUrl+"/cards/"+accountId).subscribe();
    }
  }