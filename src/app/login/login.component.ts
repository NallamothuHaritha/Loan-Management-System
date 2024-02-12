import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  username: string = '';
  password: string = '';
  cid:number=0;
   

  constructor(private http: HttpClient, private router:Router,private authService:AuthService){}

 onLogin(){
  console.log(this.username);
  console.log(this.password);
  
   let bodyData = {
     customerUsername: this.username,
     customerPassword: this.password,
     customerId:this.cid
 
   };
   this.http.post("http://localhost:8080/api/v1/users/login1",bodyData).subscribe((resultData: any)=>
   {
     console.log(resultData.customerId);
     
     if(resultData.message == "Username Not Exists")
     {
      alert("Username not exists");
     }
     else if(resultData.message == "Login Success")
     {
      this.authService.login(this.username, this.password,resultData.customerId);
        this.router.navigateByUrl('/dashboard');
     }
     else{
      alert("Incorrect Username and Password not match");
     }
   });

  }
}
