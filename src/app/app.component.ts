import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorToastComponent } from './shared/toasts/error-toast/error-toast.component';
import { ErrorToastCTAComponent } from './shared/toasts/error-toast-cta/error-toast-cta.component';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ErrorToastComponent,
    ErrorToastCTAComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ transform: 'translateX(-100%)' })),
      state('visible', style({ transform: 'translateX(0)' })),
      transition('hidden => visible', [animate('0.3s ease-out')]),
      transition('visible => hidden', [animate('0.3s ease-in')]),
    ]),
  ],
})
export class AppComponent {
  toastService = inject(ToastService);
  title = 'videoflix-frontend';
  displayToast = false;
  isVisible = false;
  errorToastState = 'hidden';
  displayToastCTA = false
  isVisibleCTA = false;
  errorToastStateCTA = 'hidden'

  ngOnInit(): void {
    this.subscribeToast();
    this.subscribeCTAToast();
  }

  subscribeToast() {
    this.toastService.displayToast.subscribe((displayToast) => {
      this.displayToast = displayToast;
      if (this.displayToast) {
        this.showErrorToast();
      } else {
        this.hideErrorToast();
      }
    });
  }

  subscribeCTAToast() {
    this.toastService.displayToastCTA.subscribe((displayToastCTA) => {
      this.displayToastCTA = displayToastCTA;
      if (this.displayToastCTA) {
        this.showErrorToastCTA();
      } else {
        this.hideErrorToastCTA();
      }
    });
  }

  showErrorToast() {
    this.isVisible = true;
    setTimeout(() => {
      this.errorToastState = 'visible';
    }, 0);
  }

  hideErrorToast() {
    this.errorToastState = 'hidden';
    setTimeout(() => {
      this.isVisible = false;
    }, 300);
  }

  showErrorToastCTA() {
    this.isVisibleCTA = true;
    setTimeout(() => {
      this.errorToastStateCTA = 'visible';
    }, 0);
  }

  hideErrorToastCTA() {
    this.errorToastStateCTA = 'hidden';
    setTimeout(() => {
      this.isVisibleCTA = false;
    }, 300);
  }
}
