import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<mat-card>
    <mat-card-title>404: Page Not Found</mat-card-title>
    <mat-card-content>
      We couldn't find that page! Not even with x-ray vision.
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button  routerLink="/">
        Take me home
      </button>
    </mat-card-actions>
  </mat-card>`,
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent{


}
