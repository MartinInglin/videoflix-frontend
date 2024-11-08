import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { DashboardData } from '../interfaces/dashboard-data';
import { HeroVideoModel } from '../models/hero-video.class';
import { Resolutions } from '../interfaces/resolutions';
import { VideoModel } from '../models/video.class';
import { getAuthHeaders } from '../utils/functions';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  http = inject(HttpClient);
  toastService = inject(ToastService);

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

  private _selectedVideoData: BehaviorSubject<VideoModel> =
    new BehaviorSubject<VideoModel>({
      id: 0,
      title: '',
      timestamp: 0,
      hls_file: '',
    });
  public selectedVideoData: Observable<VideoModel> =
    this._selectedVideoData.asObservable();

  private _videoResolution: BehaviorSubject<Resolutions> =
    new BehaviorSubject<Resolutions>(360);
  public videoResolution: Observable<Resolutions> =
    this._videoResolution.asObservable();

  selectedVideoId: number = -1;

  constructor() {}

  async getDashboardData() {
    const url = environment.baseUrl + '/dashboard/';
    const headers = getAuthHeaders();

    try {
      const response = await lastValueFrom(
        this.http.get<DashboardData>(url, { headers })
      );
      this._dashboardData.next(response);
    } catch (error) {
      this.toastService.showToast('Getting your data failed.');
    }
  }

  async storeWatchHistory(timestamp: number) {
    const video_id = this.selectedVideoId;
    const url = environment.baseUrl + '/update_watch_history/';
    const headers = getAuthHeaders();
    const body = {
      timestamp,
      video_id,
    };

    try {
      await lastValueFrom(this.http.post(url, body, { headers }));
    } catch (error) {
      this.toastService.showToast('Getting your watch history failed.');
    }
  }

  async getHeroData() {
    const url = environment.baseUrl + '/hero?id=' + this.selectedVideoId;
    const headers = getAuthHeaders();
    try {
      const response = await lastValueFrom(
        this.http.get<HeroVideoModel>(url, { headers })
      );
      this._heroVideoData.next(response);
      this.selectedVideoId = response.id;
    } catch (error) {
      this.toastService.showToast('Getting hero video data failed.');
    }
  }

  async getVideo(videoResolution: number) {
    this.getVideoIdFromSessionStorage();
    const url =
      environment.baseUrl +
      '/video?id=' +
      this.selectedVideoId +
      '&resolution=' +
      videoResolution;
    const headers = getAuthHeaders();
    try {
      const response = await lastValueFrom(
        this.http.get<VideoModel>(url, { headers })
      );
      this._selectedVideoData.next(response);
      this.storeVideoTimestampSessionStorage(response.timestamp);
    } catch (error) {
      this.toastService.showToast('Getting video data failed');
    }
  }

  setselectedVideoId(id: number) {
    this.selectedVideoId = id;
    this.storeVideoIdSessionStorage();
    this.getHeroData();
  }

  setVideoResolution(resolution: Resolutions) {
    this._videoResolution.next(resolution);
  }

  storeVideoIdSessionStorage() {
    const selectedVideoIdAsString = `${this.selectedVideoId}`;
    sessionStorage.setItem('selectedVideoId', selectedVideoIdAsString);
  }

  getVideoIdFromSessionStorage() {
    const selectedVideoId = sessionStorage.getItem('selectedVideoId');
    if (selectedVideoId) {
      this.selectedVideoId = +selectedVideoId;
    }
  }

  storeVideoTimestampSessionStorage(timestamp: number) {
    const videoTimestampAsString = `${timestamp}`;
    sessionStorage.setItem('timestamp', videoTimestampAsString);
  }

  getVideoTimestampFromSessionStorage(): number {
    const timestamp = sessionStorage.getItem('timestamp');
    if (timestamp) {
      const timestampAsNumber = +timestamp;
      return timestampAsNumber;
    } else {
      return 0;
    }
  }
}
