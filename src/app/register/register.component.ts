import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder,AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showRegisterBTN=true;
  showLoading = false;
  showME =true;
  requestError: {email:'', username:''};
  @Output() onSubmit = new EventEmitter<{username:string,email: string, password:string, passwordAgain:string}>();
  constructor() { 
    const FB =new FormBuilder();
    this.registerForm = FB.group({
      username:['',[
        Validators.required, 
      ]],
      email:['',[
        Validators.required, 

      ]],
      password:['',[
        Validators.required, 

      ]],
      passwordAgain:['',[
        Validators.required, 
      ]],

    });
    this.requestError = {username: '', email: ''}
    this.passwordAgain?.valueChanges.subscribe(() => {
      if(this.passwordAgain?.value!==this.password?.value){
        this.passwordAgain?.setErrors({match:false});
      }
      else{
        this.passwordAgain?.setErrors(null);
        console.log(this.passwordAgain);
      }
    })
    this.password?.valueChanges.subscribe(() => {
      if(this.passwordAgain?.value!==this.password?.value){
        this.passwordAgain?.setErrors({match:false});
      }
      else{
        this.passwordAgain?.setErrors(null);
        console.log(this.passwordAgain);
      }
    })
  }
  register(){
    this.onSubmit.emit({
      username: this.username?.value, 
      email: this.email?.value, 
      password: this.password?.value, 
      passwordAgain: this.passwordAgain?.value
    });
  }
  showHideLoading(){
    if(this.showLoading===true){
      this.showLoading=false;
      this.showRegisterBTN=true;
    }
    else{
      this.showLoading=true;
      this.showRegisterBTN=false;
    }
  }
  ngOnInit(): void {
  }
  get username(){
    return this.registerForm.get('username');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get passwordAgain(){
    return this.registerForm.get('passwordAgain');
  }
}
