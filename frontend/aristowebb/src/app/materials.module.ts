import { NgModule } from '@angular/core';

import { MatInputModule, MatCardModule, MatButtonModule, MatTabsModule, MatExpansionModule, MatSelectModule, MatIconModule, MatCheckboxModule } from '@angular/material'
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
  MatCheckboxModule,
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
