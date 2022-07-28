import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoginBTN=true;
  showLoading = false;
  showME =true;
  requestError: {code: number, message: string};
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
    this.requestError={message: '',code: -1};
  }

  ngOnInit(): void {
  }
  login(): void{
    this.onSubmit.emit({email: this.email?.value, password: this.password?.value});
  }
  showHideLoading(){
    if(this.showLoading===true){
      this.showLoading=false;
      this.showLoginBTN=true;
    }
    else{
      this.showLoading=true;
      this.showLoginBTN=false;
    }
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
