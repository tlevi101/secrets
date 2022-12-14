import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-new-secret',
  templateUrl: './add-new-secret.component.html',
  styleUrls: ['./add-new-secret.component.css']
})
export class AddNewSecretComponent implements OnInit {
  
  public myName="AddNewSecretComponent";
  createForm: FormGroup;
  showCreateBTN=true;
  authorized= false;
  showLoading = false;
  secret:any =null;
  domainURL: any;
  @Output() onCreateSubmit = new EventEmitter<{title: string, text:string}>();
  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.domainURL=this.document.location.origin;
    const FB= new FormBuilder();
    this.createForm= FB.group({
      title:['',[
        Validators.required,
        Validators.maxLength(64),
      ]],
      text:['',[
        Validators.required, 
      ]]

    });
  }
  create(){
    this.onCreateSubmit.emit({title: this.title?.value, text: this.text?.value});
  }
  showHideLoading(){
    if(this.showLoading===true){
      this.showLoading=false;
      this.showCreateBTN=true;
    }
    else{
      this.showLoading=true;
      this.showCreateBTN=false;
    }
  }
  ngOnInit(): void {
  }
  get title(){
    return this.createForm.get('title');
  }
  get text(){
    return this.createForm.get('text');
  }
}
