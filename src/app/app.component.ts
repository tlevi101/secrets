import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'secrets';
  private currentRoute: any;
  private hr = new HttpHeaders().set('Content-Type', 'application/json').append('Accept', 'application/json');
  private backendRoot = "https://octagonal-chip-click.glitch.me";
  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
  }
  sendLoginRequest($event: { email: string, password: string }) {
    this.currentRoute.showHideLoading();
    const CB = () => {
      this.http.post(`${this.backendRoot}/login`, JSON.stringify($event), { headers: this.hr }).subscribe(
        (res: any) => {
          localStorage.setItem('AuthToken', res?.token);
          this.currentRoute.showHideLoading();
          this.currentRoute.authorized = true;
          this.router.navigate(['/my-secrets']);
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
      this.http.post(`${this.backendRoot}/register`, $event, { headers: this.hr }).subscribe(
        (res: any) => {
          localStorage.setItem('AuthToken', res?.token);
          this.currentRoute.showHideLoading();
          this.currentRoute.authorized = true;
          this.router.navigate(['/my-secrets']);
          console.log(res);
        },
        (err) => {
          if (err.error?.message?.includes('email')) {
            this.currentRoute.requestError = { email: err.error.message, username: '' };
          }
          else {
            this.currentRoute.requestError = { username: err.error?.message, email: '' };
          }
          console.log(err);
          this.currentRoute.showHideLoading();
          //TODO:: Any other error from server

        }
      );
    }
    setTimeout(CB, 250);
  }
  mySecretsRequest() {
    this.currentRoute.showHideLoading();
    this.http.get(`${this.backendRoot}/my-secrets`, { headers: this.hr.append('Authorization', `Bearer ${localStorage.getItem('AuthToken')}`) })
      .subscribe(
        (res: any) => {
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
    this.http.post(`${this.backendRoot}/my-secrets/add`, JSON.stringify(req), 
    { headers: this.hr.append('Authorization', `Bearer ${localStorage.getItem('AuthToken')}`) })
      .subscribe(
        (res: any) => {
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
    this.http.get(`${this.backendRoot}/secrets/${this.currentRoute.uuid}`, { headers: this.hr}).subscribe(
      (res: any) => {
        this.currentRoute.secret=res;
        this.currentRoute.showHideLoading();
      },
      (err:any) => {
        this.currentRoute.err=err;
        this.currentRoute.showHideLoading();
        //TODO:: Any other error from server
      }
    )
  }
  sendShareRequest(req: any) {
    this.currentRoute.showHideLoading();
    console.log(this.currentRoute.id);
    this.http.put(`${this.backendRoot}/my-secrets/share/${this.currentRoute.id}`, JSON.stringify(req), 
    { headers: this.hr.append('Authorization', `Bearer ${localStorage.getItem('AuthToken')}`)}).subscribe(
      (res: any) => {
        this.currentRoute.showHideLoading();
        this.currentRoute.res=res;
        this.currentRoute.noRES=false;
      },
      (err:any) => {
        this.currentRoute.showHideLoading();
        this.currentRoute.reqError=err;
        console.log(err);
        
      }
    )
  }
  addedComponent($event: any) {
    this.currentRoute = $event;
    if ($event.myName === 'LoginComponent') {
      if (localStorage.getItem('AuthToken') !== null) {
        $event.authorized = true;
      }
      $event.onLoginSubmit.subscribe((req: { email: string, password: string }) => {
        this.sendLoginRequest(req);
      });
    }
    else if ($event.myName === 'RegisterComponent') {
      if (localStorage.getItem('AuthToken') !== null) {
        $event.authorized = true;
      }
      $event.onRegSubmit.subscribe((req: any) => {
        this.sendRegisterRequest(req);
      });
    }
    else if ($event.myName === 'MySecretsComponent') {
      if (localStorage.getItem('AuthToken') !== null) {
        $event.authorized = true;
        this.mySecretsRequest();
      }
    }
    else if ($event.myName === 'AddNewSecretComponent') {
      if (localStorage.getItem('AuthToken') !== null) {
        $event.authorized = true;
        $event.onCreateSubmit.subscribe((req: any) => {
          this.sendCreateRequest(req);
        });
      }
    }
    else if ($event.myName === 'SecretsComponent') {
      this.sendRequestForSecret($event);
    }
    else if($event.myName === 'ShareComponent') {
      if (localStorage.getItem('AuthToken') !== null) {
        $event.authorized = true;
        $event.onShareSubmit.subscribe((req: any) => {
          this.sendShareRequest(req);
        });
      }
    }
  }
  removedComponent($event: any) {
    if ($event.myName === 'LoginComponent') {
      $event.onLoginSubmit.unsubscribe((req: { email: string, password: string }) => {
        this.sendLoginRequest(req);
      });
    }
    else if ($event.myName === 'RegisterComponent') {
      $event.onRegSubmit.unsubscribe((req: any) => {
        this.sendRegisterRequest(req);
      });
    }
    else if ($event.myName === 'AddNewSecretComponent') {
      $event.onCreateSubmit.subscribe((req: any) => {
        this.sendCreateRequest(req);
      });
    }
  }
  logout() {
    localStorage.removeItem('AuthToken');
    this.router.navigate(['/login']);
  }
  get LocalStorage(): any {
    return localStorage;
  }
}
