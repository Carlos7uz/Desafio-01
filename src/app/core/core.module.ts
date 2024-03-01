import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule){
    if(parentModule){
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule')
    }
  }
}
