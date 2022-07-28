import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-secrets',
  templateUrl: './my-secrets.component.html',
  styleUrls: ['./my-secrets.component.css']
})
export class MySecretsComponent implements OnInit {

  authorized: boolean = false;
  constructor() { 
    
  }

  ngOnInit(): void {

  }

}
