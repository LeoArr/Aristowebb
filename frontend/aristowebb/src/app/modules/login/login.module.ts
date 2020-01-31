import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { views } from './views';

@NgModule({
  declarations: [
      ...views
  ],
  imports: [
    LoginRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
