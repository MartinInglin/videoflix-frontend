import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { ToastCTA } from '../interfaces/toast-cta';
import { getAuthHeaders } from '../utils/functions';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http = inject(HttpClient);
  toastService = inject(ToastService);
  route = inject(ActivatedRoute);

  constructor() {}

  async signUp(email: string, password: string): Promise<boolean> {
    const url = environment.baseUrl + '/registration/';
    const body = { email, password };

    try {
      await lastValueFrom(this.http.post(url, body));
      this.toastService.showToast('Account created.');
      return true;
    } catch (error) {
      this.toastService.showToast(
        'An error occured. Please contact our support.'
      );
      return false;
    }
  }

  async verificateEmail(token: string): Promise<boolean> {
    const url = environment.baseUrl + '/verification/';
    const body = { token };

    try {
      await lastValueFrom(this.http.post(url, body));
      return true;
    } catch (error) {
      const email = this.extractEmailFromToken(token)
      const toastData: ToastCTA = this.createToastDataVerificateEmail(email);
      this.toastService.showToastCTA(toastData);
      return false;
    }
  }

  extractEmailFromToken(token:string):string {
    const parts = token.split(':');
    const email = parts[0];
    return email
  }

  createToastDataVerificateEmail(token: string): ToastCTA {
    const toastContent: ToastCTA = {
      message: 'Sorry, something went wrong.',
      textButton: 'Resend email',
      action: () => this.resendVerificationEmail(token),
    };
    return toastContent;
  }

  async resendVerificationEmail(identifier: string): Promise<boolean> {
    const url = environment.baseUrl + '/resend_verifiction/';
    const body = { identifier };

    try {
      await lastValueFrom(this.http.post(url, body));
      this.toastService.showToast('Email has been sent.');
      return true;
    } catch (error) {
      this.toastService.showToast(
        'An error occured. Please contact our support.'
      );
      return false;
    }
  }

  async sendResetPasswordEmail(email: string): Promise<boolean> {
    const url = environment.baseUrl + '/forgot_password/';
    const body = { email };

    try {
      await lastValueFrom(this.http.post(url, body));
      this.toastService.showToast('Email has been sent.');
      return true;
    } catch (error) {
      this.toastService.showToast(
        'An error occured. Please contact our support.'
      );
      return false;
    }
  }

  async resetPassword(password: string, token: string): Promise<boolean> {
    const url = environment.baseUrl + '/reset_password/';
    const body = { password, token };

    try {
      await lastValueFrom(this.http.post(url, body));
      this.toastService.showToast('Password reset.');
      return true;
    } catch (error) {
      this.toastService.showToast(
        'An error occured. Please contact our support.'
      );
      return false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    const url = environment.baseUrl + '/login/';
    const body = { username: email, password };
    try {
      const response = await lastValueFrom(
        this.http.post<LoginResponse>(url, body)
      );
      const token = response.token;
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      const toastData: ToastCTA = this.createToastDataLogin(email);
      this.toastService.showToastCTA(toastData);
      return false;
    }
  }

  createToastDataLogin(email: string): ToastCTA {
    return {
      message: 'Something went wrong. Already have an account?',
      textButton: 'Send verification email',
      action: () => this.resendVerificationEmail(email),
    };
  }

  async logout(): Promise<boolean> {
    const url = environment.baseUrl + '/logout/';
    const body = {};
    const headers = getAuthHeaders();
    localStorage.removeItem('token');
    try {
      await lastValueFrom(this.http.post(url, body, { headers }));
      return true;
    } catch (error) {
      return false;
    }
  }
}
