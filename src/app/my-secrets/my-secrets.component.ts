import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-my-secrets',
  templateUrl: './my-secrets.component.html',
  styleUrls: ['./my-secrets.component.css']
})
export class MySecretsComponent implements OnInit {

  public myName="MySecretsComponent";
  authorized: boolean = false;
  today=new Date();
  showLoading: boolean = false;
  secrets: {
    id: number, 
    UserId: number, 
    title:string, 
    text:string, 
    ttl: Date, 
    url:string, 
    viewCounter:number,
    viewLimit:number,
    createdat: Date,
    updatedat: Date}[]=[];
  domainURL: string;
  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.domainURL=this.document.location.origin;
  }

  ngOnInit(): void {

  }
  addnewSecret(secret: any): void {
    this.secrets.push(secret);
  }
  showHideLoading(){
    if(this.showLoading===true){
      this.showLoading=false;
    }
    else{
      this.showLoading=true;
    }
  }
}
