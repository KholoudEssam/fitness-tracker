import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor() {}

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();

    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 30);
  }

  onFormSubmit(f: NgForm) {
    console.log(f.value);
  }
}
