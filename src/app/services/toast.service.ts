import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastCTA } from '../interfaces/toast-cta';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _displayToast: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public displayToast: Observable<boolean> = this._displayToast.asObservable();

  private _displayToastCTA: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public displayToastCTA: Observable<boolean> = this._displayToastCTA.asObservable();

  private _toastMessage: BehaviorSubject<string> = new BehaviorSubject('');
  public toastMessage: Observable<string> = this._toastMessage.asObservable();

  private _toastCTAdata: BehaviorSubject<ToastCTA | null> = new BehaviorSubject<ToastCTA | null>(null);
  public toastCTAdata: Observable<ToastCTA | null> = this._toastCTAdata.asObservable();

  toastTimeout: any;
  toastTimeoutCTA: any;

  constructor() {}

  showToast(message: string) {
    this._toastMessage.next(message);
    this._displayToast.next(true);

    clearTimeout(this.toastTimeout);

    this.toastTimeout = setTimeout(() => {
      this._displayToast.next(false);
    }, 5000);
  }

  showToastCTA(toastData: ToastCTA) {
    this._toastCTAdata.next(toastData)
    this._displayToastCTA.next(true);

    clearTimeout(this.toastTimeoutCTA);

    this.toastTimeoutCTA = setTimeout(() => {
      this._displayToastCTA.next(false);
    }, 5000);
  }

  hideToast() {
    clearTimeout(this.toastTimeout);
    this._displayToast.next(false);
    this._displayToastCTA.next(false)
  }
}
