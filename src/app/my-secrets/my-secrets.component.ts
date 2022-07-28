import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-secrets',
  templateUrl: './my-secrets.component.html',
  styleUrls: ['./my-secrets.component.css']
})
export class MySecretsComponent implements OnInit {

  authorized: boolean = false;
  secrets: any[]=[];
  constructor() { 
  }

  ngOnInit(): void {

  }
  addnewSecret(secret: any): void {
    this.secrets.push(secret);
  }

}
