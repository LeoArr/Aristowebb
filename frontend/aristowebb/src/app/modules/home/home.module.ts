import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { views } from './views';
import { MaterialsModule } from 'src/app/materials.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
      ...views
  ],
  imports: [
      HomeRoutingModule,
      MaterialsModule,
      CommonModule,
  ],
  providers: [
  ],
  bootstrap: []
})
export class HomeModule { }
