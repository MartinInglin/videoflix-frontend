import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService)

  constructor() {}

  async verificateEmail(token: string): Promise<boolean> {
    const url = environment.baseUrl + '/verification/';
    const body = { token };

    try {
      const response = await lastValueFrom(this.http.patch(url, body));
      return true;
    } catch (error) {
      return false;
    }
  }

  async resendVerificationEmail(token: string): Promise<boolean> {
    const url = environment.baseUrl + '/resend_verifiction/';
    const body = { token };

    try {
      const response = await lastValueFrom(this.http.post(url, body));
      this.toastService.hideToast();
      this.toastService.showToast('Email has been sent.')
      return true
    } catch (error) {
      this.toastService.hideToast();
      this.toastService.showToast('An error occured. Please contact our support.')
      return false;
    }
  }
}
