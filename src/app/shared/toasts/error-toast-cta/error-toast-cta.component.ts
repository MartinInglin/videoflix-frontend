import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { ToastCTA } from '../../../interfaces/toast-cta';

@Component({
  selector: 'app-error-toast-cta',
  standalone: true,
  imports: [],
  templateUrl: './error-toast-cta.component.html',
  styleUrl: './error-toast-cta.component.scss',
})
export class ErrorToastCTAComponent {
  toastService = inject(ToastService);

  toastData: ToastCTA = {
    message: '',
    textButton: '',
    action: '',
  };
  isVisible = 'hidden';

  ngOnInit(): void {
    this.toastService.toastCTAdata.subscribe((toastData: ToastCTA | null) => {
      if (toastData) {
        this.toastData = toastData;
      }
    });
  }

  closeToast() {
    this.toastService.hideToast();
  }

  resendVerificationEmail() {
    console.log('Email sent');
  }

  functionMap: { [key: string]: () => void } = {
    resendVerificationEmail: () => this.resendVerificationEmail(),
  };
}
