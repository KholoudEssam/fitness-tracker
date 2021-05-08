import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onFormSubmit(f: NgForm) {
    const { email, password } = f.value;
    const user: Auth = { email, password };
    this.authService.login(user);
  }
}
