import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'metropol-fe';
  loggedinUser:string="";

  constructor(private authenticationService:AuthenticationService){
  }

  ngOnInit(){
    this.authenticationService.getLoggedinUser().subscribe(res=>{
      this.loggedinUser = res.username;
    })
  }
}
