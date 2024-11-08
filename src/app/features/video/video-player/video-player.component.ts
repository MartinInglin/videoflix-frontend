import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { environment } from '../../../../environments/environment';
import { take } from 'rxjs';
import { VideoModel } from '../../../models/video.class';
import { Resolutions } from '../../../interfaces/resolutions';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [VjsPlayerComponent, CommonModule, RouterModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent {
  playerWidth: string = '100%';
  videoService = inject(VideoService);
  baseUrl = environment.baseUrl;

  selectedVideoData: VideoModel = {
    id: 0,
    title: '',
    timestamp: 0,
    hls_file: '',
  };
  videoUrl: string = '';
  userHasWatched = false;
  videoResolution: Resolutions = 360;
  private resizeTimeout: any;

  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: VjsPlayerComponent;

  async ngOnInit() {
    this.adjustPlayerSize();
    this.subscribeVideoResolution();
    this.setInitialVideoResolution();
    await this.videoService.getVideo(this.videoResolution);
    this.getVideoDataFromService();
    this.setUserHasWatched();
  }

  setInitialVideoResolution() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1400) {
      this.videoService.setVideoResolution(1080);
    } else if (screenWidth > 1000) {
      this.videoService.setVideoResolution(720);
    } else if (screenWidth > 800) {
      this.videoService.setVideoResolution(480);
    } else {
      this.videoService.setVideoResolution(360);
    }
  }

  getVideoDataFromService() {
    this.videoService.selectedVideoData
      .pipe(take(1))
      .subscribe((selectedVideoData) => {
        this.selectedVideoData = selectedVideoData;
        this.videoUrl = this.baseUrl + this.selectedVideoData.hls_file;
      });
  }

  subscribeVideoResolution() {
    this.videoService.videoResolution.subscribe((videoResolution) => {
      this.videoResolution = videoResolution;
    });
  }

  setUserHasWatched() {
    if (this.selectedVideoData.timestamp !== 0) {
      this.userHasWatched = true;
    }
  }

  resetTimestamp() {
    this.videoService.storeVideoTimestampSessionStorage(0);
    this.userHasWatched = false;
    setTimeout(() => {
      this.videoPlayer.playVideo();
    }, 200);
  }

  continueVideo() {
    this.userHasWatched = false;
    setTimeout(() => {
      this.videoPlayer.playVideo();
    }, 200);
  }

  forward() {
    this.videoPlayer.changeTimestamp(10);
  }

  rewind() {
    this.videoPlayer.changeTimestamp(-10);
  }

  async setVideoResolution(resolution: Resolutions) {
    this.videoService.setVideoResolution(resolution);
    await this.videoService.getVideo(resolution);
    this.getVideoDataFromService();
    this.videoPlayer.reloadVideo(this.videoUrl);
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout);

    this.adjustPlayerSize();

    this.resizeTimeout = setTimeout(() => {
      this.setInitialVideoResolution();
      this.setVideoResolution(this.videoResolution);
    }, 200);
  }

  adjustPlayerSize() {
    const containerWidth = this.container.nativeElement.offsetWidth;
    const containerHeight = this.container.nativeElement.offsetHeight - 160;
    const aspectRatio = 16 / 9;

    if (containerWidth / containerHeight > aspectRatio) {
      const newWidth =
        (aspectRatio / (containerWidth / containerHeight)) * 100 - 0.1;
      this.playerWidth = `${newWidth}%`;
    } else {
      this.playerWidth = '100%';
    }
  }
}
