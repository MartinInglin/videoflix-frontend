import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss',
})
export class ErrorToastComponent {
  toastService = inject(ToastService);

  message = '';
  isVisible = 'hidden';

  ngOnInit(): void {
    this.toastService.toastMessage.subscribe((message: string) => {
      this.message = message;
    });
  }

  closeToast() {
    this.toastService.hideToast();
  }
}
