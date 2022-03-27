import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private _formBuilder:FormBuilder, private accountService:AccountsService) { }

  ngOnInit(): void {
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
    account.clientId = this.formGroup.controls['clientId'].value

    this.accountService.addNewAccount(account);


  }

}
