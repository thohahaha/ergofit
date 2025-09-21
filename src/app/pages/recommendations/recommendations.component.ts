
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
  template: `
    <ion-content class="ergofit-content" [fullscreen]="true">
      <!-- Latihan Peregangan -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Latihan Peregangan</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="exercise-list">
            <div class="exercise-item">
              <div class="exercise-number">1</div>
              <div class="exercise-content">
                <h4>Peregangan Leher</h4>
                <p>Putar kepala perlahan ke kiri dan kanan, tahan 10 detik</p>
              </div>
            </div>
            <div class="exercise-item">
              <div class="exercise-number">2</div>
              <div class="exercise-content">
                <h4>Peregangan Bahu</h4>
                <p>Angkat bahu ke telinga, tahan 5 detik, lalu turunkan</p>
              </div>
            </div>
            <div class="exercise-item">
              <div class="exercise-number">3</div>
              <div class="exercise-content">
                <h4>Peregangan Punggung</h4>
                <p>Duduk tegak, putar tubuh ke kiri dan kanan</p>
              </div>
            </div>
            <div class="exercise-item">
              <div class="exercise-number">4</div>
              <div class="exercise-content">
                <h4>Peregangan Mata</h4>
                <p>Fokus ke objek jauh selama 20 detik</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Istirahat Aktif -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Istirahat Aktif</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="tips-list">
            <div class="tip-item">
              <div class="tip-icon">🚶</div>
              <p>Berdiri dan berjalan selama 2-3 menit setiap jam</p>
            </div>
            <div class="tip-item">
              <div class="tip-icon">🤸</div>
              <p>Lakukan gerakan ringan seperti menggerakkan pergelangan tangan</p>
            </div>
            <div class="tip-item">
              <div class="tip-icon">💧</div>
              <p>Ambil air minum sambil berjalan</p>
            </div>
            <div class="tip-item">
              <div class="tip-icon">🫁</div>
              <p>Lakukan breathing exercise 4-7-8</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips Workstation -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Tips Workstation</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="workstation-tips">
            <div class="tip-category">
              <h4>🖥️ Monitor</h4>
              <p>Posisikan bagian atas layar sejajar dengan mata</p>
            </div>
            <div class="tip-category">
              <h4>⌨️ Keyboard</h4>
              <p>Letakkan pada ketinggian yang nyaman untuk siku</p>
            </div>
            <div class="tip-category">
              <h4>🪑 Kursi</h4>
              <p>Gunakan penyangga punggung yang ergonomis</p>
            </div>
            <div class="tip-category">
              <h4>💡 Pencahayaan</h4>
              <p>Hindari silau dari jendela atau lampu</p>
            </div>
            <div class="tip-category">
              <h4>🦶 Kaki</h4>
              <p>Pastikan kaki menapak rata di lantai</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Routine -->
      <div class="ergofit-card">
        <div class="ergofit-card-header">
          <h3 class="ergofit-card-title">Rutinitas Harian Ergonomis</h3>
        </div>
        <div class="ergofit-card-content">
          <div class="routine-timeline">
            <div class="routine-item">
              <div class="time">09:00</div>
              <div class="activity">Setup workstation ergonomis</div>
            </div>
            <div class="routine-item">
              <div class="time">10:00</div>
              <div class="activity">Peregangan leher 2 menit</div>
            </div>
            <div class="routine-item">
              <div class="time">12:00</div>
              <div class="activity">Break makan siang + jalan kaki</div>
            </div>
            <div class="routine-item">
              <div class="time">14:00</div>
              <div class="activity">Peregangan punggung</div>
            </div>
            <div class="routine-item">
              <div class="time">16:00</div>
              <div class="activity">Istirahat mata + hydration</div>
            </div>
            <div class="routine-item">
              <div class="time">18:00</div>
              <div class="activity">Evaluasi postur harian</div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--ergofit-background) !important;
    }

    ion-content {
      --background: var(--ergofit-background) !important;
      background: var(--ergofit-background) !important;
    }

    ion-content::part(background) {
      background: var(--ergofit-background) !important;
    }

    ion-content::part(scroll) {
      background: var(--ergofit-background) !important;
    }

    /* Force card backgrounds to be white */
    .ergofit-card,
    div.ergofit-card,
    ion-content .ergofit-card {
      background: white !important;
      background-color: white !important;
    }

    .ergofit-card-title,
    .ergofit-card h3 {
      color: var(--ergofit-primary) !important;
    }

    .exercise-list {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-md);
    }

    .exercise-item {
      display: flex;
      align-items: flex-start;
      gap: var(--ergofit-spacing-md);
      padding: var(--ergofit-spacing-md);
      background: rgba(108, 99, 255, 0.05);
      border-radius: var(--ergofit-card-radius-sm);
      border-left: 4px solid var(--ergofit-primary);
    }

    .exercise-number {
      background: var(--ergofit-primary);
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: var(--ergofit-font-size-sm);
      flex-shrink: 0;
    }

    .exercise-content h4 {
      color: var(--ergofit-dark);
      font-weight: 600;
      margin: 0 0 var(--ergofit-spacing-xs) 0;
      font-size: var(--ergofit-font-size-md);
    }

    .exercise-content p {
      margin: 0;
      opacity: 0.8;
      line-height: 1.4;
    }

    .tips-list {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-sm);
    }

    .tip-item {
      display: flex;
      align-items: center;
      gap: var(--ergofit-spacing-sm);
      padding: var(--ergofit-spacing-sm);
      background: rgba(108, 99, 255, 0.05);
      border-radius: var(--ergofit-spacing-sm);
    }

    .tip-icon {
      font-size: var(--ergofit-font-size-xl);
      width: 40px;
      text-align: center;
    }

    .tip-item p {
      margin: 0;
      opacity: 0.8;
      line-height: 1.4;
    }

    .workstation-tips {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-md);
    }

    .tip-category {
      padding: var(--ergofit-spacing-md);
      background: rgba(108, 99, 255, 0.05);
      border-radius: var(--ergofit-card-radius-sm);
      border-left: 4px solid var(--ergofit-accent);
    }

    .tip-category h4 {
      color: var(--ergofit-dark);
      font-weight: 600;
      margin: 0 0 var(--ergofit-spacing-sm) 0;
      font-size: var(--ergofit-font-size-md);
    }

    .tip-category p {
      margin: 0;
      opacity: 0.8;
      line-height: 1.4;
    }

    .routine-timeline {
      display: flex;
      flex-direction: column;
      gap: var(--ergofit-spacing-sm);
    }

    .routine-item {
      display: flex;
      align-items: center;
      gap: var(--ergofit-spacing-md);
      padding: var(--ergofit-spacing-sm);
      background: rgba(108, 99, 255, 0.05);
      border-radius: var(--ergofit-spacing-sm);
      position: relative;
    }

    .routine-item::before {
      content: '';
      position: absolute;
      left: 60px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--ergofit-accent);
      opacity: 0.3;
    }

    .routine-item:last-child::before {
      display: none;
    }

    .time {
      background: var(--ergofit-primary);
      color: white;
      padding: var(--ergofit-spacing-xs) var(--ergofit-spacing-sm);
      border-radius: 6px;
      font-weight: 600;
      font-size: var(--ergofit-font-size-sm);
      min-width: 50px;
      text-align: center;
    }

    .activity {
      opacity: 0.8;
      line-height: 1.4;
    }

    @media (min-width: 768px) {
      .workstation-tips {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--ergofit-spacing-md);
      }
    }

    @media (max-width: 480px) {
      .exercise-item {
        padding: var(--ergofit-spacing-sm);
        gap: var(--ergofit-spacing-sm);
      }

      .exercise-number {
        width: 28px;
        height: 28px;
        font-size: var(--ergofit-font-size-xs);
      }

      .tip-category {
        padding: var(--ergofit-spacing-sm);
      }

      .routine-item::before {
        left: 54px;
      }
    }
  `]
})
export class RecommendationsComponent {
  constructor() {}

}