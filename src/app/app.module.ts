import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MySecretsComponent } from './my-secrets/my-secrets.component';
import { AddNewSecretComponent } from './add-new-secret/add-new-secret.component';
import { SecretsComponent } from './secrets/secrets.component';
import { ShareComponent } from './share/share.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MySecretsComponent,
    AddNewSecretComponent,
    SecretsComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
