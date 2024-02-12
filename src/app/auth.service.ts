import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');
  private customerId = new BehaviorSubject<number>(0);

  constructor() { }

  login(username: string, password: string,cId:number) {
    // Perform authentication logic here
    // Assuming successful login
    this.username.next(username);
    this.customerId.next(cId);
    this.loggedIn.next(true);
  }

  getUsername() {
    return this.username.asObservable();
  }

  getCustomerId(){
    return this.customerId.asObservable();
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}