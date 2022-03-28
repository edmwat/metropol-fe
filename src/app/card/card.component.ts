import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from '../models/card';
import { CardService } from '../services/card-service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private _formBuilder:FormBuilder,private cardService:CardService, private router:Router) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      id: ['', Validators.email],
      alias: ['',Validators.required],
      accountId: ['',Validators.required],
      cardType: ['',Validators.required],
    });
  }

  addNewCard(){
    let card = new Card();
    
    card.id = this.formGroup.controls['id'].value
    card.alias = this.formGroup.controls['alias'].value
    card.accountId = this.formGroup.controls['accountId'].value
    card.cardType = this.formGroup.controls['cardType'].value

    this.cardService.addNewCard(card);
    this.router.navigate(['dashboard']);
  }

}
