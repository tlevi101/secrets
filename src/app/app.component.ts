import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'secrets';
  private currentRoute: any;
  private authToken: { token: string };
  private hr = new HttpHeaders().set('Content-Type', 'application/json').append('Accept', 'application/json');
  private httpRoot = "https://picturesque-zealous-gymnast.glitch.me";
  constructor(private http: HttpClient, private router: Router) {
    this.authToken = { token: '' };
  }
  sendLoginRequest($event: { email: string, password: string }) {
    this.currentRoute.showHideLoading();
    const CB = () => {
      this.http.post(`${this.httpRoot}/login`, JSON.stringify($event), { headers: this.hr }).subscribe(
        (res: any) => {
          console.log(res.token);
          this.authToken.token = res?.token
          this.currentRoute.showHideLoading();
          this.currentRoute.showME = false;
        },
        (err) => {
          this.currentRoute.requestError = { code: err.status, message: err.error.message };
          this.currentRoute.showHideLoading();
          //TODO:: Any other error from server
        }
      )
    }
    setTimeout(CB, 250);
  }
  sendRegisterRequest($event: any) {
    this.currentRoute.showHideLoading();
    const CB = () => {
      this.http.post(`${this.httpRoot}/register`, JSON.stringify($event), { headers: this.hr }).subscribe(
        (res: any) => {
          console.log(res.token);
          this.authToken.token = res?.token;
          this.currentRoute.showHideLoading();
          this.currentRoute.showME = false;
        },
        (err) => {
          if (err.error.message.includes('email')) {
            this.currentRoute.requestError = { email: err.error.message, username: '' };
          }
          else {
            this.currentRoute.requestError = { username: err.error.message, email: '' };
          }
          this.currentRoute.showHideLoading();
          //TODO:: Any other error from server

        }
      );
    }
    setTimeout(CB, 250);
  }
  mySecretsRequest() {
    this.currentRoute.showHideLoading();
    this.http.get(`${this.httpRoot}/my-secrets`, { headers: this.hr.append('Authorization', `Bearer ${this.authToken.token}`) })
      .subscribe(
        (res: any) => {
          console.log(res);
          res.map((x: any) => this.currentRoute.addnewSecret(x));
          this.currentRoute.showHideLoading();
        },
        (err) => {
          this.currentRoute.showHideLoading();
          //TODO:: Invalid token error
          //TODO:: Any other error from server
        }
      )
  }
  sendCreateRequest(req: any) {
    this.currentRoute.showHideLoading();
    this.http.post(`${this.httpRoot}/my-secrets/add`, JSON.stringify(req), { headers: this.hr.append('Authorization', `Bearer ${this.authToken.token}`) })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/my-secrets']);
          this.currentRoute.showHideLoading();
        },
        (err) => {
          this.currentRoute.showHideLoading();
          //TODO:: Any other error from server
        })
  }
  sendRequestForSecret(req: any) {
    this.currentRoute.showHideLoading();
    this.http.get(`${this.httpRoot}/secrets/${this.currentRoute.uuid}`, { headers: this.hr}).subscribe(
      (res: any) => {
        this.currentRoute.secret=res;
        this.currentRoute.showHideLoading();
      },
      (err:any) => {
        //TODO:: Any other error from server
      }
    )
  }
  addedComponent($event: any) {
    this.currentRoute = $event;
    if ($event.constructor.name === 'LoginComponent') {
      $event.onLoginSubmit.subscribe((req: { email: string, password: string }) => {
        this.sendLoginRequest(req);
      });
    }
    else if ($event.constructor.name === 'RegisterComponent') {
      $event.onRegSubmit.subscribe((req: any) => {
        this.sendLoginRequest(req);
      });
    }
    else if ($event.constructor.name === 'MySecretsComponent') {
      if (this.AuthToken.token !== '') {
        $event.authorized = true;
        this.mySecretsRequest();
      }
    }
    else if ($event.constructor.name === 'AddNewSecretComponent') {
      if (this.AuthToken.token !== '') {
        $event.authorized = true;
        $event.onCreateSubmit.subscribe((req: any) => {
          this.sendCreateRequest(req);
        });
      }
    }
    else if ($event.constructor.name === 'SecretsComponent') {
      this.sendRequestForSecret($event);
    }
  }
  removedComponent($event: any) {
    if ($event.constructor.name === 'LoginComponent') {
      $event.onLoginSubmit.unsubscribe((req: { email: string, password: string }) => {
        this.sendLoginRequest(req);
      });
    }
    else if ($event.constructor.name === 'RegisterComponent') {
      $event.onRegSubmit.unsubscribe((req: any) => {
        this.sendLoginRequest(req);
      });
    }
    else if ($event.constructor.name === 'AddNewSecretComponent') {
      $event.onCreateSubmit.subscribe((req: any) => {
        this.sendCreateRequest(req);
      });
    }
  }
  logout() {
    this.authToken.token = '';
  }
  get AuthToken() {
    return this.authToken;
  }
}
