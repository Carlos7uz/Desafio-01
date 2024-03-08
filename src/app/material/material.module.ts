import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from  '@angular/material/progress-spinner'
import {MatListModule} from '@angular/material/list';



const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatListModule,
]

@NgModule({

  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule { }
