import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { views } from './views';
import { components } from './components';
import { MaterialsModule } from 'src/app/materials.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
      ...views,
      ...components
  ],
  imports: [
    LoginRoutingModule,
    MaterialsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
