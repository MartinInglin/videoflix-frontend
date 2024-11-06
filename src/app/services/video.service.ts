import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { DashboardData } from '../interfaces/dashboard-data';
import { HeroVideoModel } from '../models/hero-video.class';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  http = inject(HttpClient);

  private _dashboardData: BehaviorSubject<DashboardData> =
    new BehaviorSubject<DashboardData>({
      latest_videos: [],
      my_videos: [],
      category_videos: {},
      categories: [],
    });
  public dashboardData: Observable<DashboardData> =
    this._dashboardData.asObservable();

  private _heroVideoData: BehaviorSubject<HeroVideoModel> =
    new BehaviorSubject<HeroVideoModel>({
      id: 0,
      title: '',
      description: '',
      teaser: '',
    });
  public heroVideoData: Observable<HeroVideoModel> =
    this._heroVideoData.asObservable();

  heroVideoId:number = -1;

  constructor() {}

  async getDashboardData() {
    const url = environment.baseUrl + '/dashboard/';
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token')}`
    );

    try {
      const response = await lastValueFrom(
        this.http.get<DashboardData>(url, { headers })
      );
      this._dashboardData.next(response);
      console.log(response);
    } catch (error) {
      console.log('Getting video data failed', error);
    }
  }

  setHeroVideoId(id:number) {
    this.heroVideoId = id;
    this.getHeroData()
  }

  async getHeroData() {
    const url = environment.baseUrl + '/hero?id=' + this.heroVideoId;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token')}`
    );
    try {
      const response = await lastValueFrom(
        this.http.get<HeroVideoModel>(url, { headers })
      );
      this._heroVideoData.next(response);
    } catch (error) {
      console.log('Getting hero video data failed', error);
    }
  }
}
