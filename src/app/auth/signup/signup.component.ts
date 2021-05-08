import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();

    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 30);
  }

  onFormSubmit(f: NgForm) {
    const { email, bdate } = f.value;
    const user: User = { email, bdate };
    this.authService.signup(user);
  }
}
