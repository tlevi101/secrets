import { Component, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MySecretsComponent } from './my-secrets/my-secrets.component';
import { AddNewSecretComponent } from './add-new-secret/add-new-secret.component';
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'secrets';
  @ViewChild(LoginComponent) loginComp:LoginComponent;
  @ViewChild(RegisterComponent) regComp:RegisterComponent;
  @ViewChild(MySecretsComponent) mySecrets:MySecretsComponent;
  @ViewChild(AddNewSecretComponent) addNewSecret:AddNewSecretComponent;
  
  private authToken: {token:string};
  private hr= new HttpHeaders().set('Content-Type', 'application/json').append('Accept', 'application/json');
  constructor(private http: HttpClient,private router:Router) {
    this.authToken = {token: ''};
    this.loginComp = new LoginComponent();
    this.regComp = new RegisterComponent();
    this.mySecrets = new MySecretsComponent();
    this.addNewSecret = new AddNewSecretComponent();
  }
  sendLoginRequest($event:{email:string, password:string}) {
    this.loginComp.showHideLoading();
    const CB =() => {
      this.http.post('https://picturesque-zealous-gymnast.glitch.me/login',JSON.stringify($event), {headers: this.hr}).subscribe(
        (res: any) =>{
          console.log(res.token);
          this.authToken.token = res?.token
          this.loginComp.showHideLoading();
          this.loginComp.showME=false;
        },
        (err)=>{
          this.loginComp.requestError= {code:err.status,message: err.error.message};
          this.loginComp.showHideLoading();
          //TODO:: Any other error from server
        }
      )
    }
    setTimeout(CB, 250);
  }
  sendRegisterRequest($event:any) {
    this.regComp.showHideLoading();
    const CB =() => {
      this.http.post('https://picturesque-zealous-gymnast.glitch.me/register',JSON.stringify($event), {headers: this.hr}).subscribe(
        (res: any) =>{
          console.log(res.token);
          this.authToken.token = res?.token;
          this.regComp.showHideLoading();
          this.regComp.showME=false;
        },
        (err)=>{
          if(err.error.message.includes('email')){
            this.regComp.requestError= {email: err.error.message, username:''};
          }
          else{
            this.regComp.requestError= {username: err.error.message, email:''};
          }
          this.regComp.showHideLoading();
          //TODO:: Any other error from server

        }
      );
    }
    setTimeout(CB, 250);
  }
  mySecretsRequest(){
    this.mySecrets.showHideLoading();
    this.http.get('http://picturesque-zealous-gymnast.glitch.me/my-secrets', {headers: this.hr.append('Authorization', `Bearer ${this.authToken.token}`)})
    .subscribe(
      (res:any)=>{
        console.log(res);
        res.map((x:any)=>this.mySecrets.addnewSecret(x));
        this.mySecrets.showHideLoading();
    },
    (err) =>{
      this.mySecrets.showHideLoading();
      //TODO:: Invalid token error
      //TODO:: Any other error from server
    }
    )
  }
  sendCreateRequest(req:any){
    this.addNewSecret.showHideLoading();
      this.http.post('http://picturesque-zealous-gymnast.glitch.me/my-secrets/add',JSON.stringify(req), {headers: this.hr.append('Authorization', `Bearer ${this.authToken.token}`)})
      .subscribe(
        (res: any) =>{
          console.log(res);
        this.router.navigate(['/my-secrets']);
          this.addNewSecret.showHideLoading();
        },
        (err)=>{
          this.addNewSecret.showHideLoading();
          //TODO:: Any other error from server
        })    
  }
  addedComponent($event:any) {
    if($event.constructor.name==='LoginComponent'){
        this.loginComp=$event;
        $event.onLoginSubmit.subscribe((req:{email:string, password:string}) => {
        this.sendLoginRequest(req);
      });
    }
    else if($event.constructor.name==='RegisterComponent'){
        this.regComp=$event;
        $event.onRegSubmit.subscribe((req:any) => {
        this.sendLoginRequest(req);
      });
    }
    else if($event.constructor.name==='MySecretsComponent'){
      if(this.AuthToken.token!==''){
        $event.authorized=true;
        this.mySecrets=$event;
        this.mySecretsRequest();
      }
    }
    else if($event.constructor.name==='AddNewSecretComponent'){
      if(this.AuthToken.token!==''){
        $event.authorized=true;
        this.addNewSecret=$event;
        $event.onCreateSubmit.subscribe((req:any) => {
          this.sendCreateRequest(req);
        });
      }
    }
  }
  removedComponent($event:any){
    if($event.constructor.name==='LoginComponent'){
      $event.onLoginSubmit.unsubscribe((req:{email:string, password:string}) => {
        this.sendLoginRequest(req);
      });
    }
    else if($event.constructor.name==='RegisterComponent'){
      $event.onRegSubmit.unsubscribe((req:any) => {
        this.sendLoginRequest(req);
      });
    }
    else if($event.constructor.name==='AddNewSecretComponent'){
      this.addNewSecret=$event;
      $event.onCreateSubmit.subscribe((req:any) => {
      this.sendCreateRequest(req);
    });
    }
  }
  get AuthToken(){
    return this.authToken;
  }
}
