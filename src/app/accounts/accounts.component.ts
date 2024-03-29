import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import { Account } from '../models/account';
import { AccountsService } from '../services/accounts.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  formGroup!: FormGroup;
  loggedinUser:string="";

  constructor(private _formBuilder:FormBuilder, private accountService:AccountsService,private router:Router,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getLoggedinUser().subscribe(res=>{
      this.loggedinUser = res.username;
    })
    this.formGroup = this._formBuilder.group({
      id: ['', Validators.email],
      iban: ['',Validators.required],
      bicSwift: ['',Validators.required],
      clientId: ['',Validators.required],
    });
  }
  addAccount(){
    console.log("add account method calldd");
    let account = new Account();
    
    account.id = this.formGroup.controls['id'].value
    account.iban = this.formGroup.controls['iban'].value
    account.bicSwift = this.formGroup.controls['bicSwift'].value
    account.clientId = this.loggedinUser; //this.formGroup.controls['clientId'].value

console.log(account)
    this.accountService.addNewAccount(account);
    this.router.navigate(['dashboard']);

  }

}
