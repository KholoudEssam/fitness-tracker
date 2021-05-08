import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor() {}

  login(data: Auth) {
    console.log(data);
    this.isLoggedIn.next(true);
  }

  signup(data: User) {
    console.log(data);
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }
}
