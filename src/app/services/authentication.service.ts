import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { ToastCTA } from '../interfaces/toast-cta';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http = inject(HttpClient);
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

  async resendVerificationEmail(identifier: string): Promise<boolean> {
    const url = environment.baseUrl + '/resend_verifiction/';
    const body = { identifier };

    try {
      const response = await lastValueFrom(this.http.post(url, body));
      this.showToast('Email has been sent.');
      return true;
    } catch (error) {
      this.showToast('An error occured. Please contact our support.');
      return false;
    }
  }

  async sendResetPasswordEmail(email: string): Promise<boolean> {
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

  async resetPassword(password: string, token: string): Promise<boolean> {
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

  async login(username: string, password: string): Promise<boolean> {
    const url = environment.baseUrl + '/login/';
    const body = { username, password };
    try {
      const response = await lastValueFrom(
        this.http.post<LoginResponse>(url, body)
      );
      const token = response.token;
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      const toastData: ToastCTA = {
        message: 'Something went wrong. Already have an account?',
        textButton: 'Send verification email',
        action: this.resendVerificationEmail.bind(username),
      };
      this.showToastCTA(toastData);
      return false;
    }
  }

  async logout(): Promise<boolean> {
    const url = environment.baseUrl + '/logout/';
    const body = {};
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token')}`
    );
    try {
      const response = await lastValueFrom(
        this.http.post(url, body, { headers })
      );
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      this.showToast('Logout failed');
      return false;
    }
  }

  showToast(message: string) {
    this.toastService.hideToast();
    this.toastService.showToast(message);
  }

  showToastCTA(toastData: ToastCTA) {
    this.toastService.hideToast();
    this.toastService.showToastCTA(toastData);
  }
}
