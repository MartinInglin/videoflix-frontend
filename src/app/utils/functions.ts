import { HttpHeaders } from '@angular/common/http';

export function getAuthHeaders(): HttpHeaders {
  return new HttpHeaders().set(
    'Authorization',
    `Token ${localStorage.getItem('token')}`
  );
}
