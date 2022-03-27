import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account } from '../models/account';
import { AccountsService } from '../services/accounts.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedinUser:string="";
  accounts:Account[] =[];

  constructor(
    private authenticationService:AuthenticationService,
     private route:ActivatedRoute,
     private accountService:AccountsService,
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

      this.accounts.forEach(e=>{
        console.log(e)
      })
      
      //this.accounts = res as Account;
     /*  this.accounts = res.map(acc=>{
        return{
          ...acc as Account
        }
    }) */
  })
}
  
  deleteAccount(accountId:any){
    console.log("account to delete "+accountId);
    this.accountService.deleteAccount(accountId)
  }

  createAccount(){
    this.router.navigate(['account'],{relativeTo: this.route})
  }
  createCard(){
    this.router.navigate(['card'],{relativeTo: this.route})
  }
}
