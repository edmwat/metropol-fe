import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorResponse } from '../models/auth-error-response';
import { LoggedInUser } from '../models/logged-in-user';
import { LoginRequest } from '../models/loginRequest';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  validationError:string = "";
  isSubmitted:boolean = false;

  constructor(private _formBuilder:FormBuilder, 
    private authenticationService:AuthenticationService,
    private router:Router) { 
     console.log("Login component called")
    this.authenticationService.getLoggedinUser().subscribe((res:LoggedInUser)=>{
     // Console.log(res.username);
      if(res.username){
        this.router.navigate(['/dashboard']);
        //return;
      }else{
        this.router.navigate(['/login']); 
      }
         
    },(error:any)=>{
      console.log("ERROR GETTING LOGGEDINUSER:"+error);
      
    });

  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      username: ['', Validators.email],
      password: ['',Validators.required],
    });
  }

  login():void{
    this.isSubmitted=true;
    let loginReq = new LoginRequest();
    
    loginReq.username = this.formGroup.controls['username'].value
    loginReq.password = this.formGroup.controls['password'].value
   
    if(loginReq.username !="" && loginReq.password ){
      this.validationError ="";
     
      this.authenticationService.authenticate(loginReq);
      //this.formGroup.reset();
    }else{
      this.validationError ="Kindly complete the form!";
    } 
    
  }
  get formControls(){
    return this.formGroup['controls'];
  }

}
