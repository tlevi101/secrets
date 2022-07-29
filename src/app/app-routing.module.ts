import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewSecretComponent } from './add-new-secret/add-new-secret.component';
import { LoginComponent } from './login/login.component';
import { MySecretsComponent } from './my-secrets/my-secrets.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my-secrets', component: MySecretsComponent,
    children:[
    ]
  },
  {path: 'my-secrets/add', component: AddNewSecretComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
