import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account } from '../models/account';
import { Card } from '../models/card';
import { AccountsService } from '../services/accounts.service';
import { AuthenticationService } from '../services/authentication.service';
import { CardService } from '../services/card-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedinUser:string="";
  accounts:Account[] =[];
  cards:Card[] =[];
  dataSource !: Account[];

  constructor(
    private authenticationService:AuthenticationService,
     private route:ActivatedRoute,
     private accountService:AccountsService,
     private cardService:CardService,
     private router:Router) { }

  ngOnInit(): void {
    console.log("dashboard::")
    this.authenticationService.getLoggedinUser().subscribe(res=>{
      this.loggedinUser = res.username;
    })
    this.getUserAccounts();
  }

  getUserAccounts(){
    this.accountService.getUserAccount().subscribe(res=>{
      console.log("getUserAccounts()")
      this.accounts = res;
  })
}
showCards(accId:any){
  this.cardService.getAccountCards(accId).subscribe(res=>{
    console.log("getUserAccounts()")
    this.cards = res;
})
}
  
  deleteAccount(accountId:any){
    console.log("account to delete "+accountId);
    this.accountService.deleteAccount(accountId)
    this.getUserAccounts();
  }

  deleteCard(cardId:any){
    this.cardService.deleteCard(cardId);
    this.getUserAccounts();
  }
  createAccount(){
    this.router.navigate(['account'],{relativeTo: this.route})
    this.getUserAccounts();
  }
  createCard(){
    this.router.navigate(['card'],{relativeTo: this.route})
    this.getUserAccounts();
  }
}
