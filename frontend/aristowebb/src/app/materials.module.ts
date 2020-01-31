import { NgModule } from '@angular/core';

import { MatInputModule, MatCardModule } from '@angular/material'

const modules = [
  MatInputModule,
  MatCardModule,
]

@NgModule({
  imports: [
      ...modules
  ],
  exports: [
    ...modules
  ],
})
export class MaterialsModule { }
