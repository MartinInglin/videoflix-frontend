import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  private _inputData: BehaviorSubject<string> = new BehaviorSubject('');
  public inputData: Observable<string> = this._inputData.asObservable();

  constructor() {}

  setInputData(data: string) {
    this._inputData.next(data);
  }
}
