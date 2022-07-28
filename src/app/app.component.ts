import { Component, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'secrets';
  @ViewChild(LoginComponent) loginComp:LoginComponent;
  private authToken: {token:string};
  private hr= new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {
    this.authToken = {token: 'null'};
    this.loginComp = new LoginComponent();
  }
  sendLoginRequest($event:{email:string, password:string}) {
    this.loginComp.showHideLoading();
    console.log($event);
    const CB =() => {
      this.http.post('https://picturesque-zealous-gymnast.glitch.me/login',JSON.stringify($event), {headers: this.hr}).subscribe(
        (res: any) =>{
          console.log(res);
          this.authToken.token = res?.token
          this.loginComp.showHideLoading();
        },
        (err)=>{
          this.loginComp.requestError= {code:err.status,message: err.error.message};
          this.loginComp.showHideLoading();
        }
      )
    }
    setTimeout(CB, 0);
  }
}
