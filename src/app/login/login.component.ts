import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorResponse } from '../models/auth-error-response';
import { AuthenticationResponse } from '../models/auth-response';
import { LoggedInUser } from '../models/logged-in-user';
import { LoginRequest } from '../models/loginRequest';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_status:string="";
  formGroup!: FormGroup;
  validationError:string = "";
  isSubmitted:boolean = false;

  constructor(private _formBuilder:FormBuilder, 
    private authenticationService:AuthenticationService,
    private router:Router) { 

    this.authenticationService.getLoggedinUser().subscribe((res:LoggedInUser)=>{
      this.router.navigate(['/dashboard'])
    },(error:HttpErrorResponse)=>{}); 
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
     
      this.authenticationService.authenticate(loginReq).subscribe((data:AuthenticationResponse) => {  
        console.log("successfull authentication")
        
          window.localStorage.removeItem("access_token");  
          window.localStorage.setItem("access_token",data.jwt); 
          this.login_status ="Login Success";
          this.router.navigate(['/dashboard']);
        
      },(error:HttpErrorResponse)=>{
        this.login_status = error.error.message;
      });
    }else{
      this.validationError ="Kindly complete the form!";
    } 
  }
  get formControls(){
    return this.formGroup['controls'];
  }
 

}
