import { Component, inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificationService } from '../../../services/verification.service';
import { ToastService } from '../../../services/toast.service';
import { ToastCTA } from '../../../interfaces/toast-cta';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
  animations: [
    trigger('hideShowTrigger', [
      state('shown', style({ transform: 'translateY(0%)', opacity: 1 })),
      state(
        'hidden-left',
        style({ transform: 'translateX(-1000%)', opacity: 0.1 })
      ),
      transition('hidden-left => shown', [animate('0.7s ease-out')], {}),
      transition('shown => hidden-left', [animate('0.4s ease-in')], {}),
    ]),
    trigger('backgroundFadeTrigger', [
      state('background-fade-in', style({ opacity: 1 })),
      state('background-fade-out', style({ opacity: 0 })),
      transition('background-fade-out => background-fade-in', [
        animate('1s ease-in-out'),
      ]),
      transition('background-fade-in => background-fade-out', [
        animate('0.4s ease-out'),
      ]),
    ]),
  ],
})
export class VerificationComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  verificationService = inject(VerificationService);
  toastService = inject(ToastService);

  state = 'hidden-left';
  backgroundState = 'background-fade-out';

  async ngOnInit(): Promise<void> {
    debugger;
    const token = this.route.snapshot.paramMap.get('token');

    if (token) {
      const isVerified = await this.verificationService.verificateEmail(token);
      if (isVerified) {
        this.showSuccess();
      } else {
        this.showErrorToast();
      }
    }
  }

  redirect(target: string) {
    this.state = 'hidden-left';
    this.backgroundState = 'background-fade-out';
    setTimeout(() => {
      this.router.navigate([`${target}`]);
    }, 400);
  }

  showSuccess() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.state = 'shown';
      this.backgroundState = 'background-fade-in';
    }, 200);
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1000);
  }

  showErrorToast() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      const toastContent: ToastCTA = {
        message: 'Sorry, something went wrong.',
        textButton: 'Resend email',
        action: this.verificationService.resendVerificationEmail.bind(
          this.verificationService,
          token
        ),
      };
      this.toastService.showToastCTA(toastContent);
    }
  }
}
