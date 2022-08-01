import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  public myName="ShareComponent";
  shareForm: FormGroup;
  showShareBTN=true;
  showLoading = false;
  authorized =false;
  @Output() onShareSubmit = new EventEmitter<{viewLimit: number, ttl:any}>();
  constructor() { 
    const FB= new FormBuilder();
    this.shareForm = FB.group({
      viewLimit:['',[
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]],
      ttl:['',
      ]
    });
    this.TTL?.valueChanges.subscribe(() => {
      let hoursInMS= 5*60*60*1000;
      console.log(new Date(this.TTL?.value));
      console.log((new Date().getTime()+hoursInMS));
      console.log((new Date(this.TTL?.value).getTime())< (new Date().getTime()+hoursInMS));

      if((new Date(this.TTL?.value).getTime())< (new Date().getTime()+hoursInMS)) {
        this.TTL?.setErrors({tooEarly:true})
        console.log(this.TTL);
      }
      else{
        this.TTL?.setErrors(null);
      }
    });
  }
  share(){
    this.onShareSubmit.emit({viewLimit: this.ViewLimit?.value, ttl: this.TTL?.value});
  }
  ngOnInit(): void {
  }
  get ViewLimit(){
    return this.shareForm.get('viewLimit');
  }
  get TTL(){
    return this.shareForm.get('ttl');
  }
}
