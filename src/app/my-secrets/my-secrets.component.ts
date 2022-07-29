import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-secrets',
  templateUrl: './my-secrets.component.html',
  styleUrls: ['./my-secrets.component.css']
})
export class MySecretsComponent implements OnInit {

  authorized: boolean = false;
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
  constructor() { 
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
