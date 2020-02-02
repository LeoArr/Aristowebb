import { NgModule } from '@angular/core';

import { MatInputModule, MatCardModule, MatButtonModule, MatTabsModule, MatExpansionModule, MatSelectModule, MatIconModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const modules = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatTabsModule,
  MatExpansionModule,
  MatSelectModule,
  MatIconModule,
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
