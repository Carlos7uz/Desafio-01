import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'


const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
]

@NgModule({

  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule { }
