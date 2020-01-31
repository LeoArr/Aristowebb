import { NgModule } from '@angular/core';

import { MatInputModule, MatCardModule, MatButtonModule, MatTabsModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const modules = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatTabsModule,
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
