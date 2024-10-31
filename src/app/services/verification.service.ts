import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);

  constructor() {}

  async verificateEmail(userId: string, token: string): Promise<boolean> {
    const url = environment.baseUrl + '/verification/';
    const body = { userId, token };

    try {
      const response = await lastValueFrom(this.http.patch(url, body));
      return true;
    } catch (error) {
      return false;
    }
  }
  
  resendVerificationEmail() {
    
  }
}
