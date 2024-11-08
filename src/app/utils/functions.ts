import { HttpHeaders } from '@angular/common/http';

/**
 * This function creates the header for the HTTP response by getting the authentication token from the local storage.
 * @returns HTTPHeaders
 */
export function getAuthHeaders(): HttpHeaders {
  return new HttpHeaders().set(
    'Authorization',
    `Token ${localStorage.getItem('token')}`
  );
}
