import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);

  constructor() {}

  async signUp(email: string, password: string): Promise<boolean> {
    const url = environment.baseUrl + '/registration/';
    const body = { email, password };

    try {
      const response = await lastValueFrom(this.http.post(url, body));
      this.showToast('Account created.');
      return true;
    } catch (error) {
      this.showToast('An error occured. Please contact our support.');
      return false;
    }
  }

  async verificateEmail(token: string): Promise<boolean> {
    const url = environment.baseUrl + '/verification/';
    const body = { token };

    try {
      const response = await lastValueFrom(this.http.post(url, body));
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
      this.showToast('Email has been sent.');
      return true;
    } catch (error) {
      this.showToast('An error occured. Please contact our support.');
      return false;
    }
  }

  async sendResetPasswordEmail(email:string): Promise<boolean> {
    const url = environment.baseUrl + '/forgot_password/';
    const body = { email };

    try {
      const response = await lastValueFrom(this.http.post(url, body));
      this.showToast('Email has been sent.');
      return true;
    } catch (error) {
      this.showToast('An error occured. Please contact our support.');
      return false;
    }
  }

  async resetPassword(password:string, token:string): Promise<boolean> {
    const url = environment.baseUrl + '/reset_password/';
    const body = { password, token };

    try {
      const response = await lastValueFrom(this.http.post(url, body));
      this.showToast('Password reset.');
      return true;
    } catch (error) {
      this.showToast('An error occured. Please contact our support.');
      return false;
    }
  }

  showToast(message:string) {
    this.toastService.hideToast();
    this.toastService.showToast(message);
  }
}
