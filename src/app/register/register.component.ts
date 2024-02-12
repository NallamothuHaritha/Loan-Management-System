import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent 
{
  username: string = '';
  firstname: string = '';
  lastname: string = '';
  password: string = '';
  gmail: string = '';
  phonenumber: string = '';
registrationSuccessful: any;

 constructor(private http: HttpClient){

 }
save()
{
  let bodyData = {
    "customerUsername": this.username,
    "customerFirstname": this.firstname,
    "customerLastname": this.lastname,
    "customerPassword": this.password,
    "customerGmailId": this.gmail,
    "customerPhoneNumber": this.phonenumber

  };
  this.http.post("http://localhost:8080/api/v1/users/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
  {
    console.log(resultData);
    this.registrationSuccessful = true;

  });
}

}
