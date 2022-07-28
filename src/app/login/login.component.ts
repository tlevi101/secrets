import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() onSubmit = new EventEmitter<{email: string, password:string}>();
  constructor() { 
    const FB= new FormBuilder();
    this.loginForm= FB.group({
      email:['',[
        Validators.required,
        Validators.email
      ]],
      password:['',[
        Validators.required
      ]],
    });

  }

  ngOnInit(): void {
  }
  login(): void{
    this.onSubmit.emit({email: this.email?.value, password: this.password?.value});
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
