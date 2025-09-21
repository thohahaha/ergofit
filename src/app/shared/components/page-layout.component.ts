import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    CommonModule,
    IonContent
  ],
  template: `
    <ion-content class="ergofit-content">
      <div class="ergofit-container">
        <ng-content></ng-content>
      </div>
    </ion-content>
  `,
  styles: [`
    .ergofit-container {
      max-width: var(--ergofit-content-max-width);
      margin: 0 auto;
      padding: 0 var(--ergofit-spacing-sm);
    }
  `]
})
export class PageLayoutComponent {
  constructor() {}
}