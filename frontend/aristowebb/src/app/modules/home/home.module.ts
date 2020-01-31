import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { views } from './views';
import { MaterialsModule } from 'src/app/materials.module';


@NgModule({
  declarations: [
      ...views
  ],
  imports: [
      HomeRoutingModule,
      MaterialsModule,
  ],
  providers: [
  ],
  bootstrap: []
})
export class HomeModule { }
