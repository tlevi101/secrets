import { Component, OnInit, Output,EventEmitter,Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  public myName="ShareComponent";
  id: number;
  sub:any;
  shareForm: FormGroup;
  showShareBTN=true;
  showLoading = false;
  authorized =false;
  noRES=true;
  res:any;
  domainURL: string;
  reqError: any;
  @Output() onShareSubmit = new EventEmitter<{viewLimit: number, ttl:any}>();
  constructor(private route: ActivatedRoute,@Inject(DOCUMENT) private document: Document) {
    this.domainURL=this.document.location.origin;
    this.id=0;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
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
    if(this.TTL?.value!==''){
      this.onShareSubmit.emit({viewLimit: this.ViewLimit?.value, ttl: this.TTL?.value});
    }
    else{
      this.onShareSubmit.emit({viewLimit: this.ViewLimit?.value, ttl:null});
    }
  }
  ngOnInit(): void {
  }
  showHideLoading(){
    if(this.showLoading===true){
      this.showLoading=false;
      this.showShareBTN=true;
    }
    else{
      this.showLoading=true;
      this.showShareBTN=false;
    }
  }
  get ViewLimit(){
    return this.shareForm.get('viewLimit');
  }
  get TTL(){
    return this.shareForm.get('ttl');
  }
}
