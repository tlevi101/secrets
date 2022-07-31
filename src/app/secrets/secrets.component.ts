import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {

  uuid: string;
  sub:any;
  showLoading: boolean = false;
  secret :any;
  constructor(private route: ActivatedRoute) {
    this.uuid = "";
    this.sub = this.route.params.subscribe(params => {
      this.uuid = params['uuid']; // (+) converts string 'id' to a number
    });
  }

  ngOnInit(): void {
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
