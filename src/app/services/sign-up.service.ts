import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  http = inject(HttpClient);
  toastService = inject(ToastService)

  constructor() { }

  async signUp(email:string, password:string):Promise<boolean> {
    const url = environment.baseUrl + '/registration/';
    const body = { email, password };
    
    try {
      const response = await lastValueFrom(this.http.post(url, body));
      this.toastService.hideToast();
      this.toastService.showToast('Account created.')
      return true
    } catch (error) {
      this.toastService.hideToast();
      this.toastService.showToast('An error occured. Please contact our support.')
      return false;
    }
  }
}
