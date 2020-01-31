import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { views } from './views';
import { components } from './components';
import { MaterialsModule } from 'src/app/materials.module';

@NgModule({
  declarations: [
      ...views,
      ...components
  ],
  imports: [
    LoginRoutingModule,
    MaterialsModule,
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
